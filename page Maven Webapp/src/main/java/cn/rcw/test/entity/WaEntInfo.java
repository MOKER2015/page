package cn.rcw.test.entity;

import java.io.Serializable;

import cn.rcw.test.comm.SysEntJs;


public class WaEntInfo extends SysEntJs implements Serializable {
    private String entCode;

    private String entName;

    private String indstId;
    
    private String indstName;
    
    private Integer typeId;

    private String estYear;

    private String fundsId;
    
    private String currency;

    private Integer sizeId;

    private String baseBenefits;
    
    private String baseBenefitsName;
    
    private String benefits;

    private String entDesc;

    private String addrId;

    private String addr;

    private String zipcode;

    private String contact;

    private String phone;

    private String fax;

    private String mobile;

    private String email;

    private String licenceNum;

    private String brand;
    
    private String website;

    private Integer auditStatus;

    private Integer shieldStatus;

    private Integer delStatus;

    private String comment;
    
    private Integer draftStatu;
    
    private Integer archivedStatu;
    
    private String mapId;   
    
    private String entLogo;
    private String entPicOne;
    private String entPicTwo;
    private String entPicThree;
    private String entPicFour;
    private String entPicFive;
    private String entPicSix;
    
    private String entLogoName;
    private String entPicOneName;
    private String entPicTwoName;
    private String entPicThreeName;
    private String entPicFourName;
    private String entPicFiveName;
    private String entPicSixName;
    
    private String commuAddr;
    
    //企业性质名字
    private String typename;
    
    //公司规模中文名字
    private String sizename;
    
    //是否在企业介绍页显示
    private Integer contactShow;
    private Integer phoneShow;
    private Integer emailShow;
     private String tempName;
    
     private String batNo;
    
    public String getEntLogoName() {
		return entLogoName;
	}

	public void setEntLogoName(String entLogoName) {
		this.entLogoName = entLogoName;
	}

	public String getEntPicOneName() {
		return entPicOneName;
	}

	public void setEntPicOneName(String entPicOneName) {
		this.entPicOneName = entPicOneName;
	}

	public String getEntPicTwoName() {
		return entPicTwoName;
	}

	public void setEntPicTwoName(String entPicTwoName) {
		this.entPicTwoName = entPicTwoName;
	}

	public String getEntPicThreeName() {
		return entPicThreeName;
	}

	public void setEntPicThreeName(String entPicThreeName) {
		this.entPicThreeName = entPicThreeName;
	}

	public String getEntPicFourName() {
		return entPicFourName;
	}

	public void setEntPicFourName(String entPicFourName) {
		this.entPicFourName = entPicFourName;
	}

	public String getEntPicFiveName() {
		return entPicFiveName;
	}

	public void setEntPicFiveName(String entPicFiveName) {
		this.entPicFiveName = entPicFiveName;
	}

	public String getEntPicSixName() {
		return entPicSixName;
	}

	public void setEntPicSixName(String entPicSixName) {
		this.entPicSixName = entPicSixName;
	}

	public String getCommuAddr() {
		return commuAddr;
	}

	public void setCommuAddr(String commuAddr) {
		this.commuAddr = commuAddr;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getIndstName() {
		return indstName;
	}

	public void setIndstName(String indstName) {
		this.indstName = indstName;
	}

	public String getIndstId() {
		return indstId;
	}

	public void setIndstId(String indstId) {
		this.indstId = indstId;
	}

	public String getAddrId() {
		return addrId;
	}

	public void setAddrId(String addrId) {
		this.addrId = addrId;
	}

	public String getEntLogo() {
		return entLogo;
	}

	public void setEntLogo(String entLogo) {
		this.entLogo = entLogo;
	}

	public String getEntPicOne() {
		return entPicOne;
	}

	public void setEntPicOne(String entPicOne) {
		this.entPicOne = entPicOne;
	}

	public String getEntPicTwo() {
		return entPicTwo;
	}

	public void setEntPicTwo(String entPicTwo) {
		this.entPicTwo = entPicTwo;
	}

	public String getEntPicThree() {
		return entPicThree;
	}

	public void setEntPicThree(String entPicThree) {
		this.entPicThree = entPicThree;
	}

	public String getEntPicFour() {
		return entPicFour;
	}

	public void setEntPicFour(String entPicFour) {
		this.entPicFour = entPicFour;
	}

	public String getEntPicFive() {
		return entPicFive;
	}

	public void setEntPicFive(String entPicFive) {
		this.entPicFive = entPicFive;
	}

	public String getEntPicSix() {
		return entPicSix;
	}

	public void setEntPicSix(String entPicSix) {
		this.entPicSix = entPicSix;
	}

	public String getMapId() {
		return mapId;
	}

	public void setMapId(String mapId) {
		this.mapId = mapId;
	}

	public String getBaseBenefits() {
		return baseBenefits;
	}

	public void setBaseBenefits(String baseBenefits) {
		this.baseBenefits = baseBenefits;
	}

	public Integer getDraftStatu() {
		return draftStatu;
	}

	public void setDraftStatu(Integer draftStatu) {
		this.draftStatu = draftStatu;
	}

	public Integer getArchivedStatu() {
		return archivedStatu;
	}

	public void setArchivedStatu(Integer archivedStatu) {
		this.archivedStatu = archivedStatu;
	}

	public String getEntCode() {
        return entCode;
    }

    public void setEntCode(String entCode) {
        this.entCode = entCode;
    }

    public String getEntName() {
        return entName;
    }

    public void setEntName(String entName) {
        this.entName = entName;
    }

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public String getEstYear() {
        return estYear;
    }

    public void setEstYear(String estYear) {
        this.estYear = estYear;
    }

    public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public void setFundsId(String fundsId) {
		this.fundsId = fundsId;
	}

    public Integer getSizeId() {
        return sizeId;
    }

    public void setSizeId(Integer sizeId) {
        this.sizeId = sizeId;
    }

    public String getBenefits() {
        return benefits;
    }

    public void setBenefits(String benefits) {
        this.benefits = benefits;
    }

    public String getEntDesc() {
        return entDesc;
    }

    public void setEntDesc(String entDesc) {
        this.entDesc = entDesc;
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLicenceNum() {
        return licenceNum;
    }

    public void setLicenceNum(String licenceNum) {
        this.licenceNum = licenceNum;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public Integer getAuditStatus() {
        return auditStatus;
    }

    public void setAuditStatus(Integer auditStatus) {
        this.auditStatus = auditStatus;
    }

    public Integer getShieldStatus() {
        return shieldStatus;
    }

    public void setShieldStatus(Integer shieldStatus) {
        this.shieldStatus = shieldStatus;
    }

    public Integer getDelStatus() {
        return delStatus;
    }

    public void setDelStatus(Integer delStatus) {
        this.delStatus = delStatus;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

	public String getTypename() {
		return typename;
	}

	public void setTypename(String typename) {
		this.typename = typename;
	}

	public String getSizename() {
		return sizename;
	}

	public void setSizename(String sizename) {
		this.sizename = sizename;
	}

	public Integer getContactShow() {
		return contactShow;
	}

	public void setContactShow(Integer contactShow) {
		this.contactShow = contactShow;
	}

	public Integer getPhoneShow() {
		return phoneShow;
	}

	public void setPhoneShow(Integer phoneShow) {
		this.phoneShow = phoneShow;
	}

	public Integer getEmailShow() {
		return emailShow;
	}

	public void setEmailShow(Integer emailShow) {
		this.emailShow = emailShow;
	}

	public String getBaseBenefitsName() {
		return baseBenefitsName;
	}

	public void setBaseBenefitsName(String baseBenefitsName) {
		this.baseBenefitsName = baseBenefitsName;
	}
 

	public String getTempName() {
		return tempName;
	}

	public void setTempName(String tempName) {
		this.tempName = tempName;
	}

	public String getBatNo() {
		return batNo;
	}

	public void setBatNo(String batNo) {
		this.batNo = batNo;
	}

 

 
	
	
}