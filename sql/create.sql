-- tables
-- Table: Apartment
CREATE TABLE Apartment
(
    IdApartment    serial         NOT NULL,
    RoomCount      int            NOT NULL,
    Description    varchar(20000) NOT NULL,
    Photos         varchar[]      NOT NULL,
    InsertDateTime timestamp      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    IdUser         int            NOT NULL,
    IdDistrict     int            NOT NULL,
    CONSTRAINT Apartment_pk PRIMARY KEY (IdApartment)
);

-- Table: City
CREATE TABLE City
(
    IdCity serial       NOT NULL,
    Name   varchar(100) NOT NULL,
    CONSTRAINT City_pk PRIMARY KEY (IdCity)
);

-- Table: District
CREATE TABLE District
(
    IdDistrict serial       NOT NULL,
    Name       varchar(100) NOT NULL,
    IdCity     int          NOT NULL,
    CONSTRAINT District_pk PRIMARY KEY (IdDistrict)
);

-- Table: User
CREATE TABLE "User"
(
    IdUser           serial       NOT NULL,
    TelegramId       int,
    TelegramUsername varchar(100) NOT NULL,
    IdUserRole       int          NOT NULL,
    CONSTRAINT User_pk PRIMARY KEY (IdUser)
);

-- Table: UserRoleDict
CREATE TABLE UserRoleDict
(
    IdUserRole serial      NOT NULL,
    Name       varchar(50) NOT NULL,
    CONSTRAINT UserRoleDict_pk PRIMARY KEY (IdUserRole)
);

-- foreign keys
-- Reference: Apartment_District (table: Apartment)
ALTER TABLE Apartment
    ADD CONSTRAINT Apartment_District
        FOREIGN KEY (IdDistrict)
            REFERENCES District (IdDistrict)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: Apartment_User (table: Apartment)
ALTER TABLE Apartment
    ADD CONSTRAINT Apartment_User
        FOREIGN KEY (IdUser)
            REFERENCES "User" (IdUser)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: District_City (table: District)
ALTER TABLE District
    ADD CONSTRAINT District_City
        FOREIGN KEY (IdCity)
            REFERENCES City (IdCity)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: User_UserRoleDict (table: User)
ALTER TABLE "User"
    ADD CONSTRAINT User_UserRoleDict
        FOREIGN KEY (IdUserRole)
            REFERENCES UserRoleDict (IdUserRole)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- End of file.

