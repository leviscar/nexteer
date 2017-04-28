USE [nexteer]
GO

SET IDENTITY_INSERT [dbo].[product_model] ON

INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (21, N'38028772', N'R103转向上轴总成', N'BEPS', 0.1)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (22, N'38028815', N'F102转向柱总成 MSCL', N'BEPS', 0.2)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (23, N'38206242', N'B311转向柱总成MSCL', N'BEPS', 0.12)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (24, N'38206243', N'B311转向柱总成ESCL ', N'BEPS', 0.15)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (25, N'38210474', N'H20转向柱总成MCL', N'BEPS', 0.3)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (26, N'38210495', N'H20转向柱总成ECL', N'BEPS', 0.15)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (27, N'38227093', N'F102转向柱总成ESCL', N'BEPS', 0.5)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (28, N'38205893', N'C301转向柱总成 MSCL', N'CEPS', 0.3)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (29, N'38205894', N'C301转向柱总成 ESCL', N'CEPS', 0.5)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (30, N'38205895', N'C301转向柱总成ESCL', N'CEPS', 0.4)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (31, N'38207140', N'S201转向柱总成', N'CEPS', 0.14)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (32, N'38207141', N'S201转向柱总成', N'CEPS', 0.36)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (33, N'38207142', N'S201转向柱总成', N'CEPS', 0.24)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (34, N'38207143', N'S201转向柱总成', N'CEPS', 0.16)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (35, N'38219717', N'H50转向柱总成 MSCL', N'CEPS', 0.35)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (36, N'38219718', N'H50转向柱总成 ESCL', N'CEPS', 0.39)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (37, N'38027705', N'VSS 9BXX I-Shaft LHD', N'Ishaft2', 0.37)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (38, N'38028088', N'VSS 9BXX I-Shaft RHD', N'Ishaft2', 0.28)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (39, N'38028798', N'R103转向下轴总成', N'Ishaft1', 0.35)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (40, N'38028807', N'R103加长杆总成', N'Ishaft1', 0.16)
INSERT [dbo].[product_model] ([id], [model_id], [model_name], [cell_name], [std])
VALUES (41, N'38028838', N'ishaft1测试型号', N'Ishaft1', 0.16)
SET IDENTITY_INSERT [dbo].[product_model] OFF

SET IDENTITY_INSERT [dbo].[oee] ON

INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (5,80, 39, N'ISHAFT1', CAST(N'2017-03-01' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (6, 40,20, N'ISHAFT1', CAST(N'2017-03-02' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (7, 40,15, N'ISHAFT1', CAST(N'2017-03-03' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (8, 40,20, N'ISHAFT1', CAST(N'2017-03-04' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (9, 40,78, N'ISHAFT1', CAST(N'2017-03-05' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (10, 50,58, N'ISHAFT1', CAST(N'2017-03-06' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (11, 60,46, N'ISHAFT1', CAST(N'2017-03-07' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (12, 70,35, N'ISHAFT1', CAST(N'2017-03-08' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (13, 80,49, N'ISHAFT1', CAST(N'2017-03-09' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (14, 50,56, N'ISHAFT1', CAST(N'2017-03-10' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (15,80, 39, N'ISHAFT1', CAST(N'2017-03-11' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (16, 40,20, N'ISHAFT1', CAST(N'2017-03-12' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (17, 40,15, N'ISHAFT1', CAST(N'2017-03-13' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (18, 40,20, N'ISHAFT1', CAST(N'2017-03-14' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (19, 40,78, N'ISHAFT1', CAST(N'2017-03-15' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (20, 50,58, N'ISHAFT1', CAST(N'2017-03-16' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (21, 60,46, N'ISHAFT1', CAST(N'2017-03-17' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (22, 70,35, N'ISHAFT1', CAST(N'2017-03-18' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (23, 80,49, N'ISHAFT1', CAST(N'2017-03-19' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (24, 50,56, N'ISHAFT1', CAST(N'2017-03-20' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (25,80, 39, N'ISHAFT1', CAST(N'2017-03-21' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (26, 40,20, N'ISHAFT1', CAST(N'2017-03-22' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (27, 40,15, N'ISHAFT1', CAST(N'2017-03-23' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (28, 40,20, N'ISHAFT1', CAST(N'2017-03-24' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (29, 40,78, N'ISHAFT1', CAST(N'2017-03-25' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (30, 50,58, N'ISHAFT1', CAST(N'2017-03-26' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (31, 60,46, N'ISHAFT1', CAST(N'2017-03-27' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (32, 70,35, N'ISHAFT1', CAST(N'2017-03-28' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (33, 80,49, N'ISHAFT1', CAST(N'2017-03-29' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (34, 50,56, N'ISHAFT1', CAST(N'2017-03-30' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (35,80, 39, N'ISHAFT1', CAST(N'2017-03-31' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (36, 40,20, N'ISHAFT1', CAST(N'2017-04-01' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (37, 40,20, N'ISHAFT1', CAST(N'2017-04-02' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (38, 40,15, N'ISHAFT1', CAST(N'2017-04-03' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (39, 40,20, N'ISHAFT1', CAST(N'2017-04-04' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (40, 40,78, N'ISHAFT1', CAST(N'2017-04-05' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (41, 50,58, N'ISHAFT1', CAST(N'2017-04-06' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (42, 60,46, N'ISHAFT1', CAST(N'2017-04-07' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (43, 70,35, N'ISHAFT1', CAST(N'2017-04-08' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (44, 80,49, N'ISHAFT1', CAST(N'2017-04-09' AS Date))
INSERT [dbo].[oee] ([id], [oee],[target_oee], [cell_name], [add_date]) VALUES (45, 50,56, N'ISHAFT1', CAST(N'2017-04-10' AS Date))
SET IDENTITY_INSERT [dbo].[oee] OFF

SET IDENTITY_INSERT [dbo].[hce] ON

INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (5,80, 39, N'ISHAFT1', CAST(N'2017-03-01' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (6, 40,20, N'ISHAFT1', CAST(N'2017-03-02' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (7, 40,15, N'ISHAFT1', CAST(N'2017-03-03' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (8, 40,20, N'ISHAFT1', CAST(N'2017-03-04' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (9, 40,78, N'ISHAFT1', CAST(N'2017-03-05' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (10, 50,58, N'ISHAFT1', CAST(N'2017-03-06' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (11, 60,46, N'ISHAFT1', CAST(N'2017-03-07' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (12, 70,35, N'ISHAFT1', CAST(N'2017-03-08' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (13, 80,49, N'ISHAFT1', CAST(N'2017-03-09' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (14, 50,56, N'ISHAFT1', CAST(N'2017-03-10' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (15,80, 39, N'ISHAFT1', CAST(N'2017-03-11' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (16, 40,20, N'ISHAFT1', CAST(N'2017-03-12' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (17, 40,15, N'ISHAFT1', CAST(N'2017-03-13' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (18, 40,20, N'ISHAFT1', CAST(N'2017-03-14' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (19, 40,78, N'ISHAFT1', CAST(N'2017-03-15' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (20, 50,58, N'ISHAFT1', CAST(N'2017-03-16' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (21, 60,46, N'ISHAFT1', CAST(N'2017-03-17' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (22, 70,35, N'ISHAFT1', CAST(N'2017-03-18' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (23, 80,49, N'ISHAFT1', CAST(N'2017-03-19' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (24, 50,56, N'ISHAFT1', CAST(N'2017-03-20' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (25,80, 39, N'ISHAFT1', CAST(N'2017-03-21' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (26, 40,20, N'ISHAFT1', CAST(N'2017-03-22' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (27, 40,15, N'ISHAFT1', CAST(N'2017-03-23' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (28, 40,20, N'ISHAFT1', CAST(N'2017-03-24' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (29, 40,78, N'ISHAFT1', CAST(N'2017-03-25' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (30, 50,58, N'ISHAFT1', CAST(N'2017-03-26' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (31, 60,46, N'ISHAFT1', CAST(N'2017-03-27' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (32, 70,35, N'ISHAFT1', CAST(N'2017-03-28' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (33, 80,49, N'ISHAFT1', CAST(N'2017-03-29' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (34, 50,56, N'ISHAFT1', CAST(N'2017-03-30' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (35,80, 39, N'ISHAFT1', CAST(N'2017-03-31' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (36, 40,20, N'ISHAFT1', CAST(N'2017-04-01' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (37, 40,20, N'ISHAFT1', CAST(N'2017-04-02' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (38, 40,15, N'ISHAFT1', CAST(N'2017-04-03' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (39, 40,20, N'ISHAFT1', CAST(N'2017-04-04' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (40, 40,78, N'ISHAFT1', CAST(N'2017-04-05' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (41, 50,58, N'ISHAFT1', CAST(N'2017-04-06' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (42, 60,46, N'ISHAFT1', CAST(N'2017-04-07' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (43, 70,35, N'ISHAFT1', CAST(N'2017-04-08' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (44, 80,49, N'ISHAFT1', CAST(N'2017-04-09' AS Date))
INSERT [dbo].[hce] ([id], [hce],[target_hce], [cell_name], [add_date]) VALUES (45, 50,56, N'ISHAFT1', CAST(N'2017-04-10' AS Date))
SET IDENTITY_INSERT [dbo].[hce] OFF

-- DELETE FROM "safety_date";
-- /*!40000 ALTER TABLE "safety_date" DISABLE KEYS */;
-- INSERT INTO "safety_date" ("year", "month", "day", "safe_dates", "is_safe", "log") VALUES
--   ('2016', '01', '01', 1, 1, 'Today is running safe!'),
--   ('2016', '01', '02', 2, 1, 'Today is running safe!'),
--   ('2016', '01', '03', 3, 1, 'Today is running safe!'),
--   ('2016', '01', '04', 4, 1, 'Today is running safe!'),
--   ('2016', '01', '05', 5, 1, 'Today is running safe!'),
--   ('2016', '01', '06', 6, 1, 'Today is running safe!'),
--   ('2016', '01', '07', 7, 1, 'Today is running safe!'),
--   ('2016', '01', '08', 8, 1, 'Today is running safe!'),
--   ('2016', '01', '09', 9, 1, 'Today is running safe!'),
--   ('2016', '01', '10', 10, 1, 'Today is running safe!'),
--   ('2016', '01', '11', 11, 1, 'Today is running safe!'),
--   ('2016', '01', '12', 12, 1, 'Today is running safe!'),
--   ('2016', '01', '13', 13, 1, 'Today is running safe!'),
--   ('2016', '01', '14', 14, 1, 'Today is running safe!'),
--   ('2016', '01', '15', 15, 1, 'Today is running safe!'),
--   ('2016', '01', '16', 16, 1, 'Today is running safe!'),
--   ('2016', '01', '17', 17, 1, 'Today is running safe!'),
--   ('2016', '01', '18', 18, 1, 'Today is running safe!'),
--   ('2016', '01', '19', 19, 1, 'Today is running safe!'),
--   ('2016', '01', '20', 20, 1, 'Today is running safe!'),
--   ('2016', '01', '21', 21, 1, 'Today is running safe!'),
--   ('2016', '01', '22', 22, 1, 'Today is running safe!'),
--   ('2016', '01', '23', 0, 0, 'error occur'),
--   ('2016', '01', '24', 1, 1, 'Today is running safe!'),
--   ('2016', '01', '25', 2, 1, 'Today is running safe!'),
--   ('2016', '01', '26', 3, 1, 'Today is running safe!'),
--   ('2016', '01', '27', 4, 1, 'Today is running safe!'),
--   ('2016', '01', '28', 5, 1, 'Today is running safe!'),
--   ('2016', '01', '29', 6, 1, 'Today is running safe!'),
--   ('2016', '01', '30', 7, 1, 'Today is running safe!'),
--   ('2016', '01', '31', 8, 1, 'Today is running safe!'),
--   ('2016', '02', '01', 9, 1, 'Today is running safe!'),
--   ('2016', '02', '02', 10, 1, 'Today is running safe!'),
--   ('2016', '02', '03', 11, 1, 'Today is running safe!'),
--   ('2016', '02', '04', 12, 1, 'Today is running safe!'),
--   ('2016', '02', '05', 13, 1, 'Today is running safe!'),
--   ('2016', '02', '06', 14, 1, 'Today is running safe!'),
--   ('2016', '02', '07', 15, 1, 'Today is running safe!'),
--   ('2016', '02', '08', 16, 1, 'Today is running safe!'),
--   ('2016', '02', '09', 17, 1, 'Today is running safe!'),
--   ('2016', '02', '10', 18, 1, 'Today is running safe!'),
--   ('2016', '02', '11', 19, 1, 'Today is running safe!'),
--   ('2016', '02', '12', 20, 1, 'Today is running safe!'),
--   ('2016', '02', '13', 21, 1, 'Today is running safe!'),
--   ('2016', '02', '14', 22, 1, 'Today is running safe!'),
--   ('2016', '02', '15', 23, 1, 'Today is running safe!'),
--   ('2016', '02', '16', 24, 1, 'Today is running safe!'),
--   ('2016', '02', '17', 25, 1, 'Today is running safe!'),
--   ('2016', '02', '18', 26, 1, 'Today is running safe!'),
--   ('2016', '02', '19', 27, 1, 'Today is running safe!'),
--   ('2016', '02', '20', 28, 1, 'Today is running safe!'),
--   ('2016', '02', '21', 29, 1, 'Today is running safe!'),
--   ('2016', '02', '22', 30, 1, 'Today is running safe!'),
--   ('2016', '02', '23', 31, 1, 'Today is running safe!'),
--   ('2016', '02', '24', 32, 1, 'Today is running safe!'),
--   ('2016', '02', '25', 33, 1, 'Today is running safe!'),
--   ('2016', '02', '26', 34, 1, 'Today is running safe!'),
--   ('2016', '02', '27', 0, 0, 'error occur, can not produce'),
--   ('2016', '02', '28', 1, 1, 'Today is running safe!'),
--   ('2016', '02', '29', 2, 1, 'Today is running safe!'),
--   ('2016', '03', '01', 3, 1, 'Today is running safe!'),
--   ('2016', '03', '02', 4, 1, 'Today is running safe!'),
--   ('2016', '03', '03', 5, 1, 'Today is running safe!'),
--   ('2016', '03', '04', 6, 1, 'Today is running safe!'),
--   ('2016', '03', '05', 7, 1, 'Today is running safe!'),
--   ('2016', '03', '06', 8, 1, 'Today is running safe!'),
--   ('2016', '03', '07', 9, 1, 'Today is running safe!'),
--   ('2016', '03', '08', 10, 1, 'Today is running safe!'),
--   ('2016', '03', '09', 11, 1, 'Today is running safe!'),
--   ('2016', '03', '10', 12, 1, 'Today is running safe!'),
--   ('2016', '03', '11', 13, 1, 'Today is running safe!'),
--   ('2016', '03', '12', 14, 1, 'Today is running safe!'),
--   ('2016', '03', '13', 15, 1, 'Today is running safe!'),
--   ('2016', '03', '14', 16, 1, 'Today is running safe!'),
--   ('2016', '03', '15', 17, 1, 'Today is running safe!'),
--   ('2016', '03', '16', 18, 1, 'Today is running safe!'),
--   ('2016', '03', '17', 19, 1, 'Today is running safe!'),
--   ('2016', '03', '18', 20, 1, 'Today is running safe!'),
--   ('2016', '03', '19', 21, 1, 'Today is running safe!'),
--   ('2016', '03', '20', 22, 1, 'Today is running safe!'),
--   ('2016', '03', '21', 23, 1, 'Today is running safe!'),
--   ('2016', '03', '22', 24, 1, 'Today is running safe!'),
--   ('2016', '03', '23', 25, 1, 'Today is running safe!'),
--   ('2016', '03', '24', 26, 1, 'Today is running safe!'),
--   ('2016', '03', '25', 27, 1, 'Today is running safe!'),
--   ('2016', '03', '26', 28, 1, 'Today is running safe!'),
--   ('2016', '03', '27', 29, 1, 'Today is running safe!'),
--   ('2016', '03', '28', 30, 1, 'Today is running safe!'),
--   ('2016', '03', '29', 31, 1, 'Today is running safe!'),
--   ('2016', '03', '30', 32, 1, 'Today is running safe!'),
--   ('2016', '03', '31', 33, 1, 'Today is running safe!'),
--   ('2016', '04', '01', 34, 1, 'Today is running safe!'),
--   ('2016', '04', '02', 35, 1, 'Today is running safe!'),
--   ('2016', '04', '03', 36, 1, 'Today is running safe!'),
--   ('2016', '04', '04', 37, 1, 'Today is running safe!'),
--   ('2016', '04', '05', 38, 1, 'Today is running safe!'),
--   ('2016', '04', '06', 39, 1, 'Today is running safe!'),
--   ('2016', '04', '07', 40, 1, 'Today is running safe!'),
--   ('2016', '04', '08', 41, 1, 'Today is running safe!'),
--   ('2016', '04', '09', 42, 1, 'Today is running safe!'),
--   ('2016', '04', '10', 43, 1, 'Today is running safe!'),
--   ('2016', '04', '11', 44, 1, 'Today is running safe!'),
--   ('2016', '04', '12', 45, 1, 'Today is running safe!'),
--   ('2016', '04', '13', 46, 1, 'Today is running safe!'),
--   ('2016', '04', '14', 47, 1, 'Today is running safe!'),
--   ('2016', '04', '15', 48, 1, 'Today is running safe!'),
--   ('2016', '04', '16', 49, 1, 'Today is running safe!'),
--   ('2016', '04', '17', 50, 1, 'Today is running safe!'),
--   ('2016', '04', '18', 51, 1, 'Today is running safe!'),
--   ('2016', '04', '19', 52, 1, 'Today is running safe!'),
--   ('2016', '04', '20', 53, 1, 'Today is running safe!'),
--   ('2016', '04', '21', 54, 1, 'Today is running safe!'),
--   ('2016', '04', '22', 55, 1, 'Today is running safe!'),
--   ('2016', '04', '23', 56, 1, 'Today is running safe!'),
--   ('2016', '04', '24', 57, 1, 'Today is running safe!'),
--   ('2016', '04', '25', 58, 1, 'Today is running safe!'),
--   ('2016', '04', '26', 59, 1, 'Today is running safe!'),
--   ('2016', '04', '27', 60, 1, 'Today is running safe!'),
--   ('2016', '04', '28', 61, 1, 'Today is running safe!'),
--   ('2016', '04', '29', 62, 1, 'Today is running safe!'),
--   ('2016', '04', '30', 63, 1, 'Today is running safe!'),
--   ('2016', '05', '01', 64, 1, 'Today is running safe!'),
--   ('2016', '05', '02', 65, 1, 'Today is running safe!'),
--   ('2016', '05', '03', 66, 1, 'Today is running safe!'),
--   ('2016', '05', '04', 67, 1, 'Today is running safe!'),
--   ('2016', '05', '05', 68, 1, 'Today is running safe!'),
--   ('2016', '05', '06', 69, 1, 'Today is running safe!'),
--   ('2016', '05', '07', 70, 1, 'Today is running safe!'),
--   ('2016', '05', '08', 71, 1, 'Today is running safe!'),
--   ('2016', '05', '09', 72, 1, 'Today is running safe!'),
--   ('2016', '05', '10', 73, 1, 'Today is running safe!'),
--   ('2016', '05', '11', 74, 1, 'Today is running safe!'),
--   ('2016', '05', '12', 75, 1, 'Today is running safe!'),
--   ('2016', '05', '13', 76, 1, 'Today is running safe!'),
--   ('2016', '05', '14', 77, 1, 'Today is running safe!'),
--   ('2016', '05', '15', 78, 1, 'Today is running safe!'),
--   ('2016', '05', '16', 79, 1, 'Today is running safe!'),
--   ('2016', '05', '17', 80, 1, 'Today is running safe!'),
--   ('2016', '05', '18', 81, 1, 'Today is running safe!'),
--   ('2016', '05', '19', 82, 1, 'Today is running safe!'),
--   ('2016', '05', '20', 83, 1, 'Today is running safe!'),
--   ('2016', '05', '21', 84, 1, 'Today is running safe!'),
--   ('2016', '05', '22', 85, 1, 'Today is running safe!'),
--   ('2016', '05', '23', 86, 1, 'Today is running safe!'),
--   ('2016', '05', '24', 87, 1, 'Today is running safe!'),
--   ('2016', '05', '25', 88, 1, 'Today is running safe!'),
--   ('2016', '05', '26', 89, 1, 'Today is running safe!'),
--   ('2016', '05', '27', 90, 1, 'Today is running safe!'),
--   ('2016', '05', '28', 91, 1, 'Today is running safe!'),
--   ('2016', '05', '29', 92, 1, 'Today is running safe!'),
--   ('2016', '05', '30', 93, 1, 'Today is running safe!'),
--   ('2016', '05', '31', 94, 1, 'Today is running safe!'),
--   ('2016', '06', '01', 95, 1, 'Today is running safe!'),
--   ('2016', '06', '02', 96, 1, 'Today is running safe!'),
--   ('2016', '06', '03', 97, 1, 'Today is running safe!'),
--   ('2016', '06', '04', 98, 1, 'Today is running safe!'),
--   ('2016', '06', '05', 99, 1, 'Today is running safe!'),
--   ('2016', '06', '06', 100, 1, 'Today is running safe!'),
--   ('2016', '06', '07', 101, 1, 'Today is running safe!'),
--   ('2016', '06', '08', 102, 1, 'Today is running safe!'),
--   ('2016', '06', '09', 103, 1, 'Today is running safe!'),
--   ('2016', '06', '10', 104, 1, 'Today is running safe!'),
--   ('2016', '06', '11', 105, 1, 'Today is running safe!'),
--   ('2016', '06', '12', 106, 1, 'Today is running safe!'),
--   ('2016', '06', '13', 107, 1, 'Today is running safe!'),
--   ('2016', '06', '14', 108, 1, 'Today is running safe!'),
--   ('2016', '06', '15', 109, 1, 'Today is running safe!'),
--   ('2016', '06', '16', 110, 1, 'Today is running safe!'),
--   ('2016', '06', '17', 111, 1, 'Today is running safe!'),
--   ('2016', '06', '18', 112, 1, 'Today is running safe!'),
--   ('2016', '06', '19', 113, 1, 'Today is running safe!'),
--   ('2016', '06', '20', 114, 1, 'Today is running safe!'),
--   ('2016', '06', '21', 115, 1, 'Today is running safe!'),
--   ('2016', '06', '22', 116, 1, 'Today is running safe!'),
--   ('2016', '06', '23', 117, 1, 'Today is running safe!'),
--   ('2016', '06', '24', 118, 1, 'Today is running safe!'),
--   ('2016', '06', '25', 119, 1, 'Today is running safe!'),
--   ('2016', '06', '26', 120, 1, 'Today is running safe!'),
--   ('2016', '06', '27', 121, 1, 'Today is running safe!'),
--   ('2016', '06', '28', 122, 1, 'Today is running safe!'),
--   ('2016', '06', '29', 123, 1, 'Today is running safe!'),
--   ('2016', '06', '30', 124, 1, 'Today is running safe!'),
--   ('2016', '07', '01', 125, 1, 'Today is running safe!'),
--   ('2016', '07', '02', 126, 1, 'Today is running safe!'),
--   ('2016', '07', '03', 127, 1, 'Today is running safe!'),
--   ('2016', '07', '04', 128, 1, 'Today is running safe!'),
--   ('2016', '07', '05', 129, 1, 'Today is running safe!'),
--   ('2016', '07', '06', 130, 1, 'Today is running safe!'),
--   ('2016', '07', '07', 131, 1, 'Today is running safe!'),
--   ('2016', '07', '08', 132, 1, 'Today is running safe!'),
--   ('2016', '07', '09', 133, 1, 'Today is running safe!'),
--   ('2016', '07', '10', 134, 1, 'Today is running safe!'),
--   ('2016', '07', '11', 135, 1, 'Today is running safe!'),
--   ('2016', '07', '12', 136, 1, 'Today is running safe!'),
--   ('2016', '07', '13', 137, 1, 'Today is running safe!'),
--   ('2016', '07', '14', 138, 1, 'Today is running safe!'),
--   ('2016', '07', '15', 139, 1, 'Today is running safe!'),
--   ('2016', '07', '16', 140, 1, 'Today is running safe!'),
--   ('2016', '07', '17', 141, 1, 'Today is running safe!'),
--   ('2016', '07', '18', 142, 1, 'Today is running safe!'),
--   ('2016', '07', '19', 143, 1, 'Today is running safe!'),
--   ('2016', '07', '20', 144, 1, 'Today is running safe!'),
--   ('2016', '07', '21', 145, 1, 'Today is running safe!'),
--   ('2016', '07', '22', 146, 1, 'Today is running safe!'),
--   ('2016', '07', '23', 147, 1, 'Today is running safe!'),
--   ('2016', '07', '24', 148, 1, 'Today is running safe!'),
--   ('2016', '07', '25', 149, 1, 'Today is running safe!'),
--   ('2016', '07', '26', 150, 1, 'Today is running safe!'),
--   ('2016', '07', '27', 151, 1, 'Today is running safe!'),
--   ('2016', '07', '28', 152, 1, 'Today is running safe!'),
--   ('2016', '07', '29', 153, 1, 'Today is running safe!'),
--   ('2016', '07', '30', 154, 1, 'Today is running safe!'),
--   ('2016', '07', '31', 155, 1, 'Today is running safe!'),
--   ('2016', '08', '01', 156, 1, 'Today is running safe!'),
--   ('2016', '08', '02', 157, 1, 'Today is running safe!'),
--   ('2016', '08', '03', 158, 1, 'Today is running safe!'),
--   ('2016', '08', '04', 159, 1, 'Today is running safe!'),
--   ('2016', '08', '05', 160, 1, 'Today is running safe!'),
--   ('2016', '08', '06', 161, 1, 'Today is running safe!'),
--   ('2016', '08', '07', 162, 1, 'Today is running safe!'),
--   ('2016', '08', '08', 163, 1, 'Today is running safe!'),
--   ('2016', '08', '09', 164, 1, 'Today is running safe!'),
--   ('2016', '08', '10', 165, 1, 'Today is running safe!'),
--   ('2016', '08', '11', 166, 1, 'Today is running safe!'),
--   ('2016', '08', '12', 167, 1, 'Today is running safe!'),
--   ('2016', '08', '13', 168, 1, 'Today is running safe!'),
--   ('2016', '08', '14', 169, 1, 'Today is running safe!'),
--   ('2016', '08', '15', 170, 1, 'Today is running safe!'),
--   ('2016', '08', '16', 171, 1, 'Today is running safe!'),
--   ('2016', '08', '17', 172, 1, 'Today is running safe!'),
--   ('2016', '08', '18', 173, 1, 'Today is running safe!'),
--   ('2016', '08', '19', 174, 1, 'Today is running safe!'),
--   ('2016', '08', '20', 175, 1, 'Today is running safe!'),
--   ('2016', '08', '21', 176, 1, 'Today is running safe!'),
--   ('2016', '08', '22', 177, 1, 'Today is running safe!'),
--   ('2016', '08', '23', 178, 1, 'Today is running safe!'),
--   ('2016', '08', '24', 179, 1, 'Today is running safe!'),
--   ('2016', '08', '25', 180, 1, 'Today is running safe!'),
--   ('2016', '08', '26', 181, 1, 'Today is running safe!'),
--   ('2016', '08', '27', 182, 1, 'Today is running safe!'),
--   ('2016', '08', '28', 183, 1, 'Today is running safe!'),
--   ('2016', '08', '29', 184, 1, 'Today is running safe!'),
--   ('2016', '08', '30', 185, 1, 'Today is running safe!'),
--   ('2016', '08', '31', 186, 1, 'Today is running safe!'),
--   ('2016', '09', '01', 187, 1, 'Today is running safe!'),
--   ('2016', '09', '02', 188, 1, 'Today is running safe!'),
--   ('2016', '09', '03', 189, 1, 'Today is running safe!'),
--   ('2016', '09', '04', 190, 1, 'Today is running safe!'),
--   ('2016', '09', '05', 191, 1, 'Today is running safe!'),
--   ('2016', '09', '06', 192, 1, 'Today is running safe!'),
--   ('2016', '09', '07', 193, 1, 'Today is running safe!'),
--   ('2016', '09', '08', 194, 1, 'Today is running safe!'),
--   ('2016', '09', '09', 195, 1, 'Today is running safe!'),
--   ('2016', '09', '10', 196, 1, 'Today is running safe!'),
--   ('2016', '09', '11', 197, 1, 'Today is running safe!'),
--   ('2016', '09', '12', 198, 1, 'Today is running safe!'),
--   ('2016', '09', '13', 199, 1, 'Today is running safe!'),
--   ('2016', '09', '14', 200, 1, 'Today is running safe!'),
--   ('2016', '09', '15', 201, 1, 'Today is running safe!'),
--   ('2016', '09', '16', 202, 1, 'Today is running safe!'),
--   ('2016', '09', '17', 203, 1, 'Today is running safe!'),
--   ('2016', '09', '18', 204, 1, 'Today is running safe!'),
--   ('2016', '09', '19', 205, 1, 'Today is running safe!'),
--   ('2016', '09', '20', 206, 1, 'Today is running safe!'),
--   ('2016', '09', '21', 207, 1, 'Today is running safe!'),
--   ('2016', '09', '22', 208, 1, 'Today is running safe!'),
--   ('2016', '09', '23', 209, 1, 'Today is running safe!'),
--   ('2016', '09', '24', 210, 1, 'Today is running safe!'),
--   ('2016', '09', '25', 211, 1, 'Today is running safe!'),
--   ('2016', '09', '26', 212, 1, 'Today is running safe!'),
--   ('2016', '09', '27', 213, 1, 'Today is running safe!'),
--   ('2016', '09', '28', 214, 1, 'Today is running safe!'),
--   ('2016', '09', '29', 215, 1, 'Today is running safe!'),
--   ('2016', '09', '30', 216, 1, 'Today is running safe!'),
--   ('2016', '10', '01', 217, 1, 'Today is running safe!'),
--   ('2016', '10', '02', 218, 1, 'Today is running safe!'),
--   ('2016', '10', '03', 219, 1, 'Today is running safe!'),
--   ('2016', '10', '04', 220, 1, 'Today is running safe!'),
--   ('2016', '10', '05', 221, 1, 'Today is running safe!'),
--   ('2016', '10', '06', 222, 1, 'Today is running safe!'),
--   ('2016', '10', '07', 223, 1, 'Today is running safe!'),
--   ('2016', '10', '08', 224, 1, 'Today is running safe!'),
--   ('2016', '10', '09', 225, 1, 'Today is running safe!'),
--   ('2016', '10', '10', 226, 1, 'Today is running safe!'),
--   ('2016', '10', '11', 227, 1, 'Today is running safe!'),
--   ('2016', '10', '12', 228, 1, 'Today is running safe!'),
--   ('2016', '10', '13', 229, 1, 'Today is running safe!'),
--   ('2016', '10', '14', 230, 1, 'Today is running safe!'),
--   ('2016', '10', '15', 231, 1, 'Today is running safe!'),
--   ('2016', '10', '16', 232, 1, 'Today is running safe!'),
--   ('2016', '10', '17', 233, 1, 'Today is running safe!'),
--   ('2016', '10', '18', 234, 1, 'Today is running safe!'),
--   ('2016', '10', '19', 0, 0, 'in danger'),
--   ('2016', '10', '20', 1, 1, 'Today is running safe!'),
--   ('2016', '10', '21', 2, 1, 'Today is running safe!'),
--   ('2016', '10', '22', 3, 1, 'Today is running safe!'),
--   ('2016', '10', '23', 4, 1, 'Today is running safe!'),
--   ('2016', '10', '24', 5, 1, 'Today is running safe!'),
--   ('2016', '10', '25', 6, 1, 'Today is running safe!'),
--   ('2016', '10', '26', 7, 1, 'Today is running safe!'),
--   ('2016', '10', '27', 8, 1, 'Today is running safe!'),
--   ('2016', '10', '28', 9, 1, 'Today is running safe!'),
--   ('2016', '10', '29', 10, 1, 'Today is running safe!'),
--   ('2016', '10', '30', 11, 1, 'Today is running safe!'),
--   ('2016', '10', '31', 12, 1, 'Today is running safe!'),
--   ('2016', '11', '01', 13, 1, 'Today is running safe!'),
--   ('2016', '11', '02', 14, 1, 'Today is running safe!'),
--   ('2016', '11', '03', 15, 1, 'Today is running safe!'),
--   ('2016', '11', '04', 16, 1, 'Today is running safe!'),
--   ('2016', '11', '05', 17, 1, 'Today is running safe!'),
--   ('2016', '11', '06', 18, 1, 'Today is running safe!'),
--   ('2016', '11', '07', 19, 1, 'Today is running safe!'),
--   ('2016', '11', '08', 20, 1, 'Today is running safe!'),
--   ('2016', '11', '09', 21, 1, 'Today is running safe!'),
--   ('2016', '11', '10', 22, 1, 'Today is running safe!'),
--   ('2016', '11', '11', 23, 1, 'Today is running safe!'),
--   ('2016', '11', '12', 24, 1, 'Today is running safe!'),
--   ('2016', '11', '13', 25, 1, 'Today is running safe!'),
--   ('2016', '11', '14', 26, 1, 'Today is running safe!'),
--   ('2016', '11', '15', 27, 1, 'Today is running safe!'),
--   ('2016', '11', '16', 28, 1, 'Today is running safe!'),
--   ('2016', '11', '17', 29, 1, 'Today is running safe!'),
--   ('2016', '11', '18', 30, 1, 'Today is running safe!'),
--   ('2016', '11', '19', 31, 1, 'Today is running safe!'),
--   ('2016', '11', '20', 32, 1, 'Today is running safe!'),
--   ('2016', '11', '21', 33, 1, 'Today is running safe!'),
--   ('2016', '11', '22', 34, 1, 'Today is running safe!'),
--   ('2016', '11', '23', 0, 0, 'cannot do it safely'),
--   ('2016', '11', '24', 1, 1, 'Today is running safe!'),
--   ('2016', '11', '25', 2, 1, 'Today is running safe!'),
--   ('2016', '11', '26', 3, 1, 'Today is running safe!'),
--   ('2016', '11', '27', 4, 1, 'Today is running safe!'),
--   ('2016', '11', '28', 5, 1, 'Today is running safe!'),
--   ('2016', '11', '29', 6, 1, 'Today is running safe!'),
--   ('2016', '11', '30', 7, 1, 'Today is running safe!'),
--   ('2016', '12', '01', 8, 1, 'Today is running safe!'),
--   ('2016', '12', '02', 9, 1, 'Today is running safe!'),
--   ('2016', '12', '03', 10, 1, 'Today is running safe!'),
--   ('2016', '12', '04', 11, 1, 'Today is running safe!'),
--   ('2016', '12', '05', 12, 1, 'Today is running safe!'),
--   ('2016', '12', '06', 13, 1, 'Today is running safe!'),
--   ('2016', '12', '07', 14, 1, 'Today is running safe!'),
--   ('2016', '12', '08', 15, 1, 'Today is running safe!'),
--   ('2016', '12', '09', 16, 1, 'Today is running safe!'),
--   ('2016', '12', '10', 17, 1, 'Today is running safe!'),
--   ('2016', '12', '11', 18, 1, 'Today is running safe!'),
--   ('2016', '12', '12', 19, 1, 'Today is running safe!'),
--   ('2016', '12', '13', 20, 1, 'Today is running safe!'),
--   ('2016', '12', '14', 21, 1, 'Today is running safe!'),
--   ('2016', '12', '15', 22, 1, 'Today is running safe!'),
--   ('2016', '12', '16', 23, 1, 'Today is running safe!'),
--   ('2016', '12', '17', 24, 1, 'Today is running safe!'),
--   ('2016', '12', '18', 25, 1, 'Today is running safe!'),
--   ('2016', '12', '19', 26, 1, 'Today is running safe!'),
--   ('2016', '12', '20', 27, 1, 'Today is running safe!'),
--   ('2016', '12', '21', 28, 1, 'Today is running safe!'),
--   ('2016', '12', '22', 29, 1, 'Today is running safe!'),
--   ('2016', '12', '23', 30, 1, 'Today is running safe!'),
--   ('2016', '12', '24', 31, 1, 'Today is running safe!'),
--   ('2016', '12', '25', 32, 1, 'Today is running safe!'),
--   ('2016', '12', '26', 33, 1, 'Today is running safe!'),
--   ('2016', '12', '27', 34, 1, 'Today is running safe!'),
--   ('2016', '12', '28', 35, 1, 'Today is running safe!'),
--   ('2016', '12', '29', 36, 1, 'Today is running safe!'),
--   ('2016', '12', '30', 37, 1, 'Today is running safe!'),
--   ('2016', '12', '31', 38, 1, 'Today is running safe!');