export interface Position {
  ID?: number;
  PositionNameVN?: string;
  PositionNameEN?: string;
  isActive?: boolean;
  DateCreated?: string;
  UserCreated?: string;
  DateUpdated?: string;
  UserUpdated?: string;
}

export interface Department {
  ID?: number;
  NameDepartmentVN?: string;
  NameDepartmentEN?: string;
  isActive?: boolean;
  DateCreated?: string;
  UserCreated?: string;
  DateUpdated?: string;
  UserUpdated?: string;
}

export interface Employee {
  ID?: number;
  EmployeeCode?: string;
  FirstName?: string;
  FullName?: string;
  CommonName?: string;
  Gender?: boolean;
  Images?: string;
  Birthday?: string;
  PlaceOfBirth?: string;
  Married?: boolean; 
  Address?: string;
  AddressTmp?: string;
  Phone?: string;
  Email?: string;
  CCCD?: string;
  DateCCCD?: string;
  IssuedBy?: string;
  DateStartWord?: string;
  Health?: string;
  Height?: number;
  Weight?: number;
  StatusWork?: number;
  NationalityID?: number;
  NationID?: number;
  ReligionID?: number;
  DegreeID?: number;
  ForeignID?: string;
  BHXH?: boolean;
  BHYT?: boolean;
  BHTN?: boolean;
  UnionDues?: boolean;
  Authority?: boolean;
  Note?: string;
  CreatedByUser?: string;
  CreatedByDate?: string;
  MaritalID?: number;
  Comment?: string;
  Department?: Department;
  DateUpdated?: string;
  UserLastUpdated?: string;
  Position?: Position;
  CompanyID?: number;
  NoBHXH?: string;
  DateBHXH?: string;
  IssueByBHXH?: string;
  NoBHYT?: string;
  fromDateBHYT?: string;
  toDateBHYT?: string;
  ProvinceBHYT?: string;
  HopitalBHYT?: string;
  isActive?: boolean;
  LeaderID?: number;
  ManagerID?: number;
  Salary?: number;
}
