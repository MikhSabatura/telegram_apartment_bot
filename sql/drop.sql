-- foreign keys
ALTER TABLE Apartment
    DROP CONSTRAINT Apartment_District;

ALTER TABLE Apartment
    DROP CONSTRAINT Apartment_User;

ALTER TABLE District
    DROP CONSTRAINT District_City;

ALTER TABLE "User"
    DROP CONSTRAINT User_UserRoleDict;

-- tables
DROP TABLE Apartment;

DROP TABLE City;

DROP TABLE District;

DROP TABLE "User";

DROP TABLE UserRoleDict;

-- End of file.

