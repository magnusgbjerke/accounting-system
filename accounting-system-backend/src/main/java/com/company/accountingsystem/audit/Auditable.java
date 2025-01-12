package com.company.accountingsystem.audit;

public interface Auditable {
    Audit getAudit();

    void setAudit(Audit audit);
}