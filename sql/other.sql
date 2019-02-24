
-- other shit
SELECT *
FROM apartment;

select iduser, userroledict.name as role
from "User"
inner join userroledict on "User".iduserrole = userroledict.iduserrole
where telegramid = 1488 or telegramusername = 'unreg1';

-- adding element to array

------------------------------

-- INSERT INTO persons (lastname,firstname) VALUES ('Smith', 'John') RETURNING id;

delete from apartment;

INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (1,
        'Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow''s nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.',
        ARRAY ['AgADAgADH6oxG2SmSUu8qwzSxrdpU-zOUQ8ABGLs9n_ydt3MWlQAAgI', 'AgADAgADXaoxG0AhSUtSwz18Bogdg-RWUw8ABKySPTKxwxD88lYAAgI', 'AgADAgADIaoxG2SmSUsQxyt7URJmhTLOUQ8ABD0g6aWgp5pAC1IAAgI'],
        4, 1);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (2,
        'Hearties sutler keelhaul clipper chase Brethren of the Coast draft fire ship Pieces of Eight execution dock. Killick man-of-war execution dock parley crimp barque long boat Jack Tar main sheet haul wind. Coffer pressgang salmagundi wench carouser crow''s nest hang the jib pirate loaded to the gunwalls Pirate Round.',
        ARRAY ['AgADAgADUakxG1uFEUvcV09TFe-pmnZ5Uw8ABNpLh5-tJVfQOCUAAgI','AgADAgADbakxG1uFEUtRXinmhKPwv9K9UQ8ABJDPbBd1r4h38icAAgI','AgADAgADa6oxG1e1UErSwIprSFm_tzZ0Xw8ABDx4oZeFfw4huiQBAAEC'],
        4, 2);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (2,
        'Fire in the hole chase guns hornswaggle sheet Cat o''nine tails knave bilge rat hearties mutiny hogshead. Fathom run a shot across the bow aft heave down avast grog salmagundi broadside grapple code of conduct. ',
        ARRAY ['AgADAgADJqoxGzlQOEseF87xS5fZsitRXw8ABNyDKk6_Vtql0d4BAAEC','AgADAgADq6oxGy5GOUuVDpq6DYUiWtq8UQ8ABG5Q0mEdMPXQmEcAAgI','AgADAgADJaoxGzlQOEvvRsmQ55fBdPr_9A4ABG-5c9R9cQxV19sEAAEC','AgADAgADJKoxGzlQOEtlaYrcax6Q7clIXw8ABFlkWA2pwFa5ctkBAAEC'],
        4, 3);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (4,
        'Salmagundi lugsail Sink me port boom fluke fore carouser Gold Road parley. Cackle fruit Buccaneer hulk scallywag black spot brig barque log pillage lanyard. Log ballast parley spike cackle fruit Brethren of the Coast Blimey knave parrel bilge.',
        ARRAY ['AgADAgAD5KsxG3Qu4Er0OGZZjhLrjhZSOQ8ABHaD2_HewDNrOmMCAAEC','AgADAgAD46sxG3Qu4Eq3QBiLTbgOiqpKOQ8ABKSuhsXWM0Ih7mMCAAEC','AgADAgAD4qsxG3Qu4Er1DXP9fbY61PdbOQ8ABMOumH-SgQbGV2UCAAEC'],
        4, 4);

SELECT * FROM "User";
delete from "User" where telegramid = 259275181;