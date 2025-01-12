package com.company.accountingsystem.voucher;

import com.company.accountingsystem.account.Account;
import com.company.accountingsystem.exceptions.CustomException;
import com.company.accountingsystem.voucher.attachment.Attachment;
import com.company.accountingsystem.voucher.attachment.AttachmentRepository;
import com.company.accountingsystem.year.Year;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class VoucherService {

    private final VoucherRepository voucherRepository;
    private final AttachmentRepository attachmentRepository;

    public VoucherService(VoucherRepository voucherRepository, AttachmentRepository attachmentRepository) {
        this.voucherRepository = voucherRepository;
        this.attachmentRepository = attachmentRepository;
    }

    public List<VoucherResponseDTO> getVouchers() {
        List<VoucherResponseDTO> vouchers = new ArrayList<>();
        attachmentRepository.findAll().forEach(x ->
                vouchers.add(new VoucherResponseDTO(x.getVoucher().getNr(),
                        x.getDate(), x.getAccount().getNr(), x.getAmount()))
        );
        return vouchers;
    }

    @Transactional
    public void createVouchers(List<VoucherRequestDTO> vouchers) {
        //1. Grouping vouchers based on vouchernr
        List<Voucher.VoucherWithAttachments> groupedVouchers = Voucher.groupVoucherByNr(vouchers);
        //2. Validate each voucher
        groupedVouchers.forEach(voucher -> validateVoucher(voucher));
        //3. Setting pk for each voucher, based on the attachments
        groupedVouchers.forEach(voucher -> voucher.setPKBasedOnAttachment(voucher));
        //4. Check if voucherPK exist
        groupedVouchers.forEach(voucher ->
                voucherRepository.findById(new Voucher.VoucherPK(voucher.getNr(), voucher.getYear())).ifPresent(x -> {
                    throw new CustomException("Voucher " + voucher.getNr() + " does already exist.");
                })
        );
        //5. Saving vouchers
        groupedVouchers.forEach(voucher -> {
            voucherRepository.save(new Voucher(voucher.getNr(), new Year(voucher.getYear().getNr())));
            voucher.getAttachments().forEach(attachment -> {
                Voucher newVoucher = new Voucher(attachment.getVoucher().getNr(), attachment.getVoucher().getYear());
                LocalDate newDate = attachment.getDate();
                Account newAccount = attachment.getAccount();
                BigDecimal newAmount = attachment.getAmount();
                attachmentRepository.save(new Attachment(newVoucher, newDate, newAccount, newAmount));
            });
        });
    }

    public void validateVoucher(Voucher.VoucherWithAttachments voucher) {
        //1. Check if all attachments are within the same year
        LocalDate pickFirstDate = voucher.getAttachments().getFirst().getDate();
        voucher.getAttachments().forEach(attachment -> {
            if (attachment.getDate().getYear() != pickFirstDate.getYear()) {
                throw new CustomException("Voucher " + voucher.getNr() + " has rows with different years.");
            }
        });
        //2. Check if attachments equals 0
        BigDecimal counter = BigDecimal.ZERO;
        for (int x = 0; x < voucher.getAttachments().size(); x++) {
            counter = counter.add(voucher.getAttachments().get(x).getAmount());
        }
        if (counter.compareTo(BigDecimal.ZERO) != 0) {
            throw new CustomException("The total amount in voucher " + voucher.getNr() + " must be 0, but it is " + counter + ".");
        }
        //3. Group by dates in voucher and check if dates equals 0
        Map<LocalDate, List<Attachment>> myObjectsPerId =
                voucher.getAttachments().stream().collect(Collectors.groupingBy(Attachment::getDate));
        //3.1 x=sorted id, y=list of sorted id
        myObjectsPerId.forEach((x, y) -> {
            BigDecimal counter2 = BigDecimal.ZERO;
            for (int l = 0; l < y.size(); l++) {
                counter2 = counter2.add(y.get(l).getAmount());
            }
            if (counter2.compareTo(BigDecimal.ZERO) != 0) {
                throw new CustomException("Rows in voucher " + voucher.getNr() + " does equal 0. But some of the rows" +
                        " in voucher " + voucher.getNr() + " does not equal 0, based on date");
            }
        });
    }
}



