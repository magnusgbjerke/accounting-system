package com.company.accountingsystem.voucher;

import com.company.accountingsystem.account.Account;
import com.company.accountingsystem.audit.Audit;
import com.company.accountingsystem.audit.AuditListener;
import com.company.accountingsystem.audit.Auditable;
import com.company.accountingsystem.voucher.attachment.Attachment;
import com.company.accountingsystem.year.Year;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table
@NoArgsConstructor
@Data
@IdClass(Voucher.VoucherPK.class)
@EntityListeners(AuditListener.class)
public class Voucher implements Auditable {
    @Id
    public Integer nr;
    @ManyToOne
    @Id
    public Year year;

    @Embedded
    private Audit audit;

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class VoucherPK implements Serializable {
        public Integer nr;
        @ManyToOne
        public Year year;
    }

    public Voucher(Integer nr, Year year) {
        this.nr = nr;
        this.year = year;
    }

    public void setPKBasedOnAttachment(VoucherWithAttachments voucher) {
        this.year = new Year(voucher.getAttachments().getFirst().getDate().getYear());
    }

    @EqualsAndHashCode(callSuper = true)
    @ToString(callSuper = true)
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class VoucherWithAttachments extends Voucher {
        private List<Attachment> attachments;
    }

    public static List<Voucher.VoucherWithAttachments> groupVoucherByNr(List<VoucherRequestDTO> vouchers) {
        Map<Integer, List<VoucherRequestDTO>> myObjectsPerId =
                vouchers.stream().collect(Collectors.groupingBy(VoucherRequestDTO::getNr));
        //Convert list of Object to vouchers with attachment. x=sorted id, y=list of sorted id
        List<Voucher.VoucherWithAttachments> tempL = new ArrayList<>();
        myObjectsPerId.forEach((x, y) -> {
            Voucher.VoucherWithAttachments tempV = new Voucher.VoucherWithAttachments();
            tempV.setNr(x);
            tempV.setYear(null); //setting year at a later stage
            List<Attachment> attachments = new ArrayList<>();
            y.forEach((o) -> {
                Attachment tempA = new Attachment();
                tempA.setVoucher(new Voucher(x, new Year(y.getFirst().getDate().getYear())));
                tempA.setDate(o.getDate());
                tempA.setAccount(new Account(o.getAccount(), null));
                tempA.setAmount(o.getAmount());
                attachments.add(tempA);
            });
            tempV.setAttachments(attachments);
            tempL.add(tempV);
        });
        return tempL;
    }
}