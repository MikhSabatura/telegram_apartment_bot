-- cities
INSERT INTO CITY(idcity, Name)
VALUES (1, 'Warsaw');
INSERT INTO CITY(idcity, Name)
VALUES (2, 'Krakow');
INSERT INTO CITY(idcity, Name)
VALUES (3, 'Wroclaw');
INSERT INTO CITY(idcity, Name)
VALUES (4, 'Lublin');

-- districts

-- Warsaw
INSERT INTO District(Name, IdCity)
VALUES ('Bemowo', 1);
INSERT INTO District(Name, IdCity)
VALUES ('Bielany', 1);
INSERT INTO District(Name, IdCity)
VALUES ('Mokotów', 1);
INSERT INTO District(Name, IdCity)
VALUES ('Ochota', 1);
INSERT INTO District(Name, IdCity)
VALUES ('Praga-Południe', 1);
INSERT INTO District(Name, IdCity)
VALUES ('Praga-Północ', 1);
INSERT INTO District(Name, IdCity)
VALUES ('Śródmieście', 1);
INSERT INTO District(Name, IdCity)
VALUES ('Targówek', 1);
INSERT INTO District(Name, IdCity)
VALUES ('Ursynów', 1);
INSERT INTO District(Name, IdCity)
VALUES ('Włochy', 1);
INSERT INTO District(Name, IdCity)
VALUES ('Żoliborz', 1);
INSERT INTO District(Name, IdCity)
VALUES ('Other', 1);

-- Krakow
INSERT INTO District(Name, IdCity)
VALUES ('Stare Miasto', 2);
INSERT INTO District(Name, IdCity)
VALUES ('Grzegórzki', 2);
INSERT INTO District(Name, IdCity)
VALUES ('Krowodrza', 2);
INSERT INTO District(Name, IdCity)
VALUES ('Bronowice', 2);
INSERT INTO District(Name, IdCity)
VALUES ('Dębniki', 2);
INSERT INTO District(Name, IdCity)
VALUES ('Podgórze', 2);
INSERT INTO District(Name, IdCity)
VALUES ('Prądnik Biały', 2);
INSERT INTO District(Name, IdCity)
VALUES ('Other', 2);

-- Wroclaw
INSERT INTO District(Name, IdCity)
VALUES ('Stare Miasto', 3);
INSERT INTO District(Name, IdCity)
VALUES ('Śródmieście', 3);
INSERT INTO District(Name, IdCity)
VALUES ('Psie Pole', 3);
INSERT INTO District(Name, IdCity)
VALUES ('Krzyki', 3);
INSERT INTO District(Name, IdCity)
VALUES ('Fabryczna', 3);
INSERT INTO District(Name, IdCity)
VALUES ('Other', 3);

-- Lublin
INSERT INTO District(Name, IdCity)
VALUES ('Centrum', 4);
INSERT INTO District(Name, IdCity)
VALUES ('Urbanist', 4);
INSERT INTO District(Name, IdCity)
VALUES ('Svetov', 4);
INSERT INTO District(Name, IdCity)
VALUES ('Libertarianec', 4);
INSERT INTO District(Name, IdCity)
VALUES ('Other', 4);

--user role
INSERT INTO userroledict(iduserrole, name)
VALUES (1, 'admin');
INSERT INTO userroledict(iduserrole, name)
VALUES (2, 'broker');
INSERT INTO userroledict(iduserrole, name)
VALUES (3, 'searcher');

-- user
INSERT INTO "User"(telegramid, telegramusername, iduserrole)
VALUES (1, 'mikhsb', 1);
INSERT INTO "User"(telegramid, telegramusername, iduserrole)
VALUES (2, 'UnityV', 1);

-- INSERT INTO "User"(telegramid, telegramusername, iduserrole)
-- VALUES (4, 'reg1', 2);
-- INSERT INTO "User"(telegramid, telegramusername, iduserrole)
-- VALUES (5, 'reg2', 2);
-- INSERT INTO "User"(telegramid, telegramusername, iduserrole)
-- VALUES (null, 'unreg1', 2);
--
-- INSERT INTO "User"(telegramid, telegramusername, iduserrole)
-- VALUES (7, 'reg3', 3);
-- INSERT INTO "User"(telegramid, telegramusername, iduserrole)
-- VALUES (null, 'unreg2', 3);
-- INSERT INTO "User"(telegramid, telegramusername, iduserrole)
-- VALUES (null, 'unreg3', 3);

INSERT INTO "User"(telegramid, telegramusername, iduserrole)
VALUES (181738645, 'mikhsb', 1);
-- INSERT INTO "User"(telegramid, telegramusername, iduserrole)
-- VALUES (772382004, 'searcherTest', 3);
INSERT INTO "User"(telegramid, telegramusername, iduserrole)
VALUES (772382004, 'brokerTest', 2);
INSERT INTO "User"(telegramid, telegramusername, iduserrole)
VALUES (259275181, 'UnityV', 1);


-- apartments
-- Warsaw
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (1,
        'Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow''s nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.',
        ARRAY ['AgADAgADH6oxG2SmSUu8qwzSxrdpU-zOUQ8ABGLs9n_ydt3MWlQAAgI', 'AgADAgADXaoxG0AhSUtSwz18Bogdg-RWUw8ABKySPTKxwxD88lYAAgI', 'AgADAgADIaoxG2SmSUsQxyt7URJmhTLOUQ8ABD0g6aWgp5pAC1IAAgI'],
        1, 1);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (2,
        'Hearties sutler keelhaul clipper chase Brethren of the Coast draft fire ship Pieces of Eight execution dock. Killick man-of-war execution dock parley crimp barque long boat Jack Tar main sheet haul wind. Coffer pressgang salmagundi wench carouser crow''s nest hang the jib pirate loaded to the gunwalls Pirate Round.',
        ARRAY ['AgADAgADUakxG1uFEUvcV09TFe-pmnZ5Uw8ABNpLh5-tJVfQOCUAAgI','AgADAgADbakxG1uFEUtRXinmhKPwv9K9UQ8ABJDPbBd1r4h38icAAgI','AgADAgADa6oxG1e1UErSwIprSFm_tzZ0Xw8ABDx4oZeFfw4huiQBAAEC'],
        1, 2);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (2,
        'Fire in the hole chase guns hornswaggle sheet Cat o''nine tails knave bilge rat hearties mutiny hogshead. Fathom run a shot across the bow aft heave down avast grog salmagundi broadside grapple code of conduct. ',
        ARRAY ['AgADAgADJqoxGzlQOEseF87xS5fZsitRXw8ABNyDKk6_Vtql0d4BAAEC','AgADAgADq6oxGy5GOUuVDpq6DYUiWtq8UQ8ABG5Q0mEdMPXQmEcAAgI','AgADAgADJaoxGzlQOEvvRsmQ55fBdPr_9A4ABG-5c9R9cQxV19sEAAEC','AgADAgADJKoxGzlQOEtlaYrcax6Q7clIXw8ABFlkWA2pwFa5ctkBAAEC'],
        2, 3);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (4,
        'Salmagundi lugsail Sink me port boom fluke fore carouser Gold Road parley. Cackle fruit Buccaneer hulk scallywag black spot brig barque log pillage lanyard. Log ballast parley spike cackle fruit Brethren of the Coast Blimey knave parrel bilge.',
        ARRAY ['AgADAgAD5KsxG3Qu4Er0OGZZjhLrjhZSOQ8ABHaD2_HewDNrOmMCAAEC','AgADAgAD46sxG3Qu4Eq3QBiLTbgOiqpKOQ8ABKSuhsXWM0Ih7mMCAAEC','AgADAgAD4qsxG3Qu4Er1DXP9fbY61PdbOQ8ABMOumH-SgQbGV2UCAAEC'],
        2, 4);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (5,
        'Spanish Main Brethren of the Coast cable poop deck keel black jack provost nipper pinnace gangplank Jack Tar ho prow rutters Buccaneer Admiral of the Black Cat o''nine tails landlubber or just lubber brigantine Sail ho. Davy Jones'' Locker Yellow Jack lee hogshead Brethren of the Coast dance the hempen jig six pounders yard Blimey cutlass',
        ARRAY ['AgADAgADZasxG_wSuEqqq9RMu-4y8yz7tw4ABD7a_ScAAYS5gfl1BgABAg','AgADAgADZKsxG_wSuEoFksbnT5KC1TBCOQ8ABCeI4v25EaIK50MCAAEC','AgADAgADY6sxG_wSuEqzRGI6R5g0onxSOQ8ABKteEOJlOS7v9EACAAEC'],
        3, 5);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (0,
        'Jolly Roger hail-shot gibbet cable sheet Blimey chandler mizzen brig flogging broadside cog lanyard sloop league. Piracy loot careen boatswain handsomely Cat ',
        ARRAY ['AgADAgADYqsxG_wSuEozSi2SyODxotxUOQ8ABKBCtIDuCXFKyEMCAAEC','AgADAgADZKsxG_wSuEoFksbnT5KC1TBCOQ8ABCeI4v25EaIK50MCAAEC'], 3, 6);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (1,
        'Bring a spring upon her cable gunwalls aye ballast red ensign draft heave down bounty take a caulk pirate Barbary Coast brig sloop Sail ho doubloon',
        ARRAY ['AgADAgADwKoxG49xMEuQpu8dZm_ChnWfOQ8ABN9CCfEDmCIhqq0EAAEC', 'AgADAgAD9qoxG5R1UEvjqoktqFA4r-mxUQ8ABHkNgHKkuISa71UAAgI', 'AgADAgAD9aoxG5R1UEsd2olzJM2EJbL_9A4ABK8nJNlK-M7LyukEAAEC'],
        1, 1);

INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (1,
        'Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow''s nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.',
        ARRAY ['AgADAgADH6oxG2SmSUu8qwzSxrdpU-zOUQ8ABGLs9n_ydt3MWlQAAgI', 'AgADAgADXaoxG0AhSUtSwz18Bogdg-RWUw8ABKySPTKxwxD88lYAAgI', 'AgADAgADIaoxG2SmSUsQxyt7URJmhTLOUQ8ABD0g6aWgp5pAC1IAAgI'],
        1, 6);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (2,
        'Hearties sutler keelhaul clipper chase Brethren of the Coast draft fire ship Pieces of Eight execution dock. Killick man-of-war execution dock parley crimp barque long boat Jack Tar main sheet haul wind. Coffer pressgang salmagundi wench carouser crow''s nest hang the jib pirate loaded to the gunwalls Pirate Round.',
        ARRAY ['AgADAgADUakxG1uFEUvcV09TFe-pmnZ5Uw8ABNpLh5-tJVfQOCUAAgI','AgADAgADbakxG1uFEUtRXinmhKPwv9K9UQ8ABJDPbBd1r4h38icAAgI','AgADAgADa6oxG1e1UErSwIprSFm_tzZ0Xw8ABDx4oZeFfw4huiQBAAEC'],
        1, 7);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (2,
        'Fire in the hole chase guns hornswaggle sheet Cat o''nine tails knave bilge rat hearties mutiny hogshead. Fathom run a shot across the bow aft heave down avast grog salmagundi broadside grapple code of conduct. ',
        ARRAY ['AgADAgADJqoxGzlQOEseF87xS5fZsitRXw8ABNyDKk6_Vtql0d4BAAEC','AgADAgADq6oxGy5GOUuVDpq6DYUiWtq8UQ8ABG5Q0mEdMPXQmEcAAgI','AgADAgADJaoxGzlQOEvvRsmQ55fBdPr_9A4ABG-5c9R9cQxV19sEAAEC','AgADAgADJKoxGzlQOEtlaYrcax6Q7clIXw8ABFlkWA2pwFa5ctkBAAEC'],
        2, 8);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (4,
        'Salmagundi lugsail Sink me port boom fluke fore carouser Gold Road parley. Cackle fruit Buccaneer hulk scallywag black spot brig barque log pillage lanyard. Log ballast parley spike cackle fruit Brethren of the Coast Blimey knave parrel bilge.',
        ARRAY ['AgADAgAD5KsxG3Qu4Er0OGZZjhLrjhZSOQ8ABHaD2_HewDNrOmMCAAEC','AgADAgAD46sxG3Qu4Eq3QBiLTbgOiqpKOQ8ABKSuhsXWM0Ih7mMCAAEC','AgADAgAD4qsxG3Qu4Er1DXP9fbY61PdbOQ8ABMOumH-SgQbGV2UCAAEC'],
        2, 9);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (5,
        'Spanish Main Brethren of the Coast cable poop deck keel black jack provost nipper pinnace gangplank Jack Tar ho prow rutters Buccaneer Admiral of the Black Cat o''nine tails landlubber or just lubber brigantine Sail ho. Davy Jones'' Locker Yellow Jack lee hogshead Brethren of the Coast dance the hempen jig six pounders yard Blimey cutlass',
        ARRAY ['AgADAgADZasxG_wSuEqqq9RMu-4y8yz7tw4ABD7a_ScAAYS5gfl1BgABAg','AgADAgADZKsxG_wSuEoFksbnT5KC1TBCOQ8ABCeI4v25EaIK50MCAAEC','AgADAgADY6sxG_wSuEqzRGI6R5g0onxSOQ8ABKteEOJlOS7v9EACAAEC'],
        3, 10);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (0,
        'Jolly Roger hail-shot gibbet cable sheet Blimey chandler mizzen brig flogging broadside cog lanyard sloop league. Piracy loot careen boatswain handsomely Cat ',
        ARRAY ['AgADAgADYqsxG_wSuEozSi2SyODxotxUOQ8ABKBCtIDuCXFKyEMCAAEC','AgADAgADZKsxG_wSuEoFksbnT5KC1TBCOQ8ABCeI4v25EaIK50MCAAEC'], 3, 6);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (1,
        'Bring a spring upon her cable gunwalls aye ballast red ensign draft heave down bounty take a caulk pirate Barbary Coast brig sloop Sail ho doubloon',
        ARRAY ['AgADAgADwKoxG49xMEuQpu8dZm_ChnWfOQ8ABN9CCfEDmCIhqq0EAAEC', 'AgADAgAD9qoxG5R1UEvjqoktqFA4r-mxUQ8ABHkNgHKkuISa71UAAgI', 'AgADAgAD9aoxG5R1UEsd2olzJM2EJbL_9A4ABK8nJNlK-M7LyukEAAEC'],
        1, 11);

INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (1,
        'Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow''s nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.',
        ARRAY ['AgADAgADH6oxG2SmSUu8qwzSxrdpU-zOUQ8ABGLs9n_ydt3MWlQAAgI', 'AgADAgADXaoxG0AhSUtSwz18Bogdg-RWUw8ABKySPTKxwxD88lYAAgI', 'AgADAgADIaoxG2SmSUsQxyt7URJmhTLOUQ8ABD0g6aWgp5pAC1IAAgI'],
        1, 12);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (2,
        'Hearties sutler keelhaul clipper chase Brethren of the Coast draft fire ship Pieces of Eight execution dock. Killick man-of-war execution dock parley crimp barque long boat Jack Tar main sheet haul wind. Coffer pressgang salmagundi wench carouser crow''s nest hang the jib pirate loaded to the gunwalls Pirate Round.',
        ARRAY ['AgADAgADUakxG1uFEUvcV09TFe-pmnZ5Uw8ABNpLh5-tJVfQOCUAAgI','AgADAgADbakxG1uFEUtRXinmhKPwv9K9UQ8ABJDPbBd1r4h38icAAgI','AgADAgADa6oxG1e1UErSwIprSFm_tzZ0Xw8ABDx4oZeFfw4huiQBAAEC'],
        1, 13);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (2,
        'Fire in the hole chase guns hornswaggle sheet Cat o''nine tails knave bilge rat hearties mutiny hogshead. Fathom run a shot across the bow aft heave down avast grog salmagundi broadside grapple code of conduct. ',
        ARRAY ['AgADAgADJqoxGzlQOEseF87xS5fZsitRXw8ABNyDKk6_Vtql0d4BAAEC','AgADAgADq6oxGy5GOUuVDpq6DYUiWtq8UQ8ABG5Q0mEdMPXQmEcAAgI','AgADAgADJaoxGzlQOEvvRsmQ55fBdPr_9A4ABG-5c9R9cQxV19sEAAEC','AgADAgADJKoxGzlQOEtlaYrcax6Q7clIXw8ABFlkWA2pwFa5ctkBAAEC'],
        2, 14);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (4,
        'Salmagundi lugsail Sink me port boom fluke fore carouser Gold Road parley. Cackle fruit Buccaneer hulk scallywag black spot brig barque log pillage lanyard. Log ballast parley spike cackle fruit Brethren of the Coast Blimey knave parrel bilge.',
        ARRAY ['AgADAgAD5KsxG3Qu4Er0OGZZjhLrjhZSOQ8ABHaD2_HewDNrOmMCAAEC','AgADAgAD46sxG3Qu4Eq3QBiLTbgOiqpKOQ8ABKSuhsXWM0Ih7mMCAAEC','AgADAgAD4qsxG3Qu4Er1DXP9fbY61PdbOQ8ABMOumH-SgQbGV2UCAAEC'],
        2, 15);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (5,
        'Spanish Main Brethren of the Coast cable poop deck keel black jack provost nipper pinnace gangplank Jack Tar ho prow rutters Buccaneer Admiral of the Black Cat o''nine tails landlubber or just lubber brigantine Sail ho. Davy Jones'' Locker Yellow Jack lee hogshead Brethren of the Coast dance the hempen jig six pounders yard Blimey cutlass',
        ARRAY ['AgADAgADZasxG_wSuEqqq9RMu-4y8yz7tw4ABD7a_ScAAYS5gfl1BgABAg','AgADAgADZKsxG_wSuEoFksbnT5KC1TBCOQ8ABCeI4v25EaIK50MCAAEC','AgADAgADY6sxG_wSuEqzRGI6R5g0onxSOQ8ABKteEOJlOS7v9EACAAEC'],
        3, 16);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (0,
        'Jolly Roger hail-shot gibbet cable sheet Blimey chandler mizzen brig flogging broadside cog lanyard sloop league. Piracy loot careen boatswain handsomely Cat ',
        ARRAY ['AgADAgADYqsxG_wSuEozSi2SyODxotxUOQ8ABKBCtIDuCXFKyEMCAAEC','AgADAgADZKsxG_wSuEoFksbnT5KC1TBCOQ8ABCeI4v25EaIK50MCAAEC'], 3, 6);
INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (1,
        'Bring a spring upon her cable gunwalls aye ballast red ensign draft heave down bounty take a caulk pirate Barbary Coast brig sloop Sail ho doubloon',
        ARRAY ['AgADAgADwKoxG49xMEuQpu8dZm_ChnWfOQ8ABN9CCfEDmCIhqq0EAAEC', 'AgADAgAD9qoxG5R1UEvjqoktqFA4r-mxUQ8ABHkNgHKkuISa71UAAgI', 'AgADAgAD9aoxG5R1UEsd2olzJM2EJbL_9A4ABK8nJNlK-M7LyukEAAEC'],
        1, 17);

INSERT INTO apartment (roomcount, description, photos, iduser, iddistrict)
VALUES (1,
        'Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow''s nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.',
        ARRAY ['AgADAgADH6oxG2SmSUu8qwzSxrdpU-zOUQ8ABGLs9n_ydt3MWlQAAgI', 'AgADAgADXaoxG0AhSUtSwz18Bogdg-RWUw8ABKySPTKxwxD88lYAAgI', 'AgADAgADIaoxG2SmSUsQxyt7URJmhTLOUQ8ABD0g6aWgp5pAC1IAAgI'],
        1, 18);