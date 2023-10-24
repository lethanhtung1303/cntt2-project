export interface Position {
  ID?: number;
  positionNameVN?: string;
  positionNameEN?: string;
  isActive?: boolean;
  dateCreated?: string;
  userCreated?: string;
  dateUpdated?: string;
  userUpdated?: string;
}

export interface Department {
  ID?: number;
  nameDepartmentVN?: string;
  nameDepartmentEN?: string;
  isActive?: boolean;
  dateCreated?: string;
  userCreated?: string;
  dateUpdated?: string;
  userUpdated?: string;
}

export interface Employee {
  ID?: number;
  employeeCode?: string;
  firstName?: string;
  fullName?: string;
  commonName?: string;
  gender?: boolean;
  images?: string;
  birthday?: string;
  placeOfBirth?: string;
  married?: boolean;
  address?: string;
  addressTmp?: string;
  phone?: string;
  email?: string;
  CCCD?: string;
  dateCCCD?: string;
  issuedBy?: string;
  dateStartWord?: string;
  health?: string;
  height?: number;
  weight?: number;
  statusWork?: number;
  nationalityID?: number;
  nationID?: number;
  religionID?: number;
  degreeID?: number;
  foreignID?: string;
  BHXH?: boolean;
  BHYT?: boolean;
  BHTN?: boolean;
  unionDues?: boolean;
  authority?: boolean;
  note?: string;
  createdByUser?: string;
  createdByDate?: string;
  maritalID?: number;
  comment?: string;
  department?: Department;
  dateUpdated?: string;
  userLastUpdated?: string;
  position?: Position;
  companyID?: number;
  noBHXH?: string;
  dateBHXH?: string;
  issueByBHXH?: string;
  noBHYT?: string;
  fromDateBHYT?: string;
  toDateBHYT?: string;
  provinceBHYT?: string;
  hopitalBHYT?: string;
  isActive?: boolean;
  leaderID?: number;
  managerID?: number;
  salary?: number;
}
