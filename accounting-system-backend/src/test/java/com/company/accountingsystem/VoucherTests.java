package com.company.accountingsystem;

import com.company.accountingsystem.voucher.VoucherRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest
@AutoConfigureMockMvc
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class VoucherTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @BeforeEach
    void setUp() {
        jdbcTemplate.execute("delete from attachment");
        jdbcTemplate.execute("delete from voucher");
        jdbcTemplate.execute("delete from account");
        jdbcTemplate.execute("delete from year");

        jdbcTemplate.execute("insert into account values (1920, 'Bankinnskudd'), (2400, 'Leverandørgjeld')," +
                " (3000, 'Salgsinntekter');");
        jdbcTemplate.execute("insert into year values (2023), (2024);");
    }

    @Test
    @Order(1)
    public void getVouchers_endpoint_test() throws Exception {
        jdbcTemplate.execute("insert into voucher values (1, 2023, now())");
        jdbcTemplate.execute("insert into attachment (voucher_nr_fk, voucher_year_fk, date, account_nr, amount)" +
                " values (1, 2023, '2023-02-02', 1920, 200)");

        mockMvc.perform(get("/api/voucher"))
                .andDo(print())
                .andExpectAll(
                        status().isOk(),
                        content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON)
                );
    }

    @Test
    @Order(2)
    void createVouchers_endpoint_test_success() throws Exception {
        String simple_voucher = """
                    [
                        {"nr": 1, "date": "2023-02-23", "account": 1920, "amount": 200},
                        {"nr": 1, "date": "2023-02-23", "account": 2400, "amount": -200}
                    ]
                """;
        postEndpoint(simple_voucher);
        String advanced_voucher = """
                    [
                        {"nr": 2, "date": "2023-06-15", "account": 1920, "amount": 555.72},
                        {"nr": 2, "date": "2023-06-15", "account": 2400, "amount": -411},
                        {"nr": 2, "date": "2023-06-15", "account": 1920, "amount": -925.22},
                        {"nr": 2, "date": "2023-06-15", "account": 1920, "amount": 780.5},
                        {"nr": 3, "date": "2024-11-01", "account": 2400, "amount": -9156},
                        {"nr": 3, "date": "2024-11-01", "account": 3000, "amount": 9156.0}
                    ]
                """;
        postEndpoint(advanced_voucher);
    }

    private void postEndpoint(String jsonRequest) throws Exception {
        mockMvc.perform(post("/api/voucher")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andDo(print())
                .andExpect(status().isCreated());
    }
}
