package com.programaformacao.server.models;

public class StudentForm {

  private String name;

  private Long school_id;

  private Long kit_id;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Long getSchool_id() {
    return school_id;
  }

  public void setSchool_id(Long school_id) {
    this.school_id = school_id;
  }

  public Long getKit_id() {
    return kit_id;
  }

  public void setKit_id(Long kit_id) {
    this.kit_id = kit_id;
  }
}
