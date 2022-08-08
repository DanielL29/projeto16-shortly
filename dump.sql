--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Ubuntu 14.4-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: heroku_ext; Type: SCHEMA; Schema: -; Owner: u36r0h10i6ah3o
--

CREATE SCHEMA heroku_ext;


ALTER SCHEMA heroku_ext OWNER TO u36r0h10i6ah3o;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: shortens; Type: TABLE; Schema: public; Owner: ridqzhoiqjbawd
--

CREATE TABLE public.shortens (
    id integer NOT NULL,
    "shortUrl" text NOT NULL,
    url text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.shortens OWNER TO ridqzhoiqjbawd;

--
-- Name: shortens_id_seq; Type: SEQUENCE; Schema: public; Owner: ridqzhoiqjbawd
--

CREATE SEQUENCE public.shortens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shortens_id_seq OWNER TO ridqzhoiqjbawd;

--
-- Name: shortens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ridqzhoiqjbawd
--

ALTER SEQUENCE public.shortens_id_seq OWNED BY public.shortens.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: ridqzhoiqjbawd
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO ridqzhoiqjbawd;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: ridqzhoiqjbawd
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO ridqzhoiqjbawd;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ridqzhoiqjbawd
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: shortens id; Type: DEFAULT; Schema: public; Owner: ridqzhoiqjbawd
--

ALTER TABLE ONLY public.shortens ALTER COLUMN id SET DEFAULT nextval('public.shortens_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: ridqzhoiqjbawd
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: shortens; Type: TABLE DATA; Schema: public; Owner: ridqzhoiqjbawd
--

COPY public.shortens (id, "shortUrl", url, "visitCount", "userId", "createdAt") FROM stdin;
65	aEe1iIHV	https://gmail.com	0	1	2022-08-08 20:26:40.993177
64	NuIEXiTZ	https://nike.com	1	1	2022-08-08 20:17:57.808448
43	wpWdAQQo	https://netvasco.com.br	1	3	2022-08-05 23:13:00.433641
52	s63HIgjX	https://http.cat/411.jpg	2	1	2022-08-08 02:35:00.907667
56	mE72LFbk	https://google.com	2	2	2022-08-08 02:52:17.321031
58	v2eECEM2	https://projeto13-mywallet-front-beryl-seven.vercel.app/home	2	1	2022-08-08 16:45:44.167736
2	z18yPBCb	https://google.com	26	1	2022-08-04 20:16:02.422334
59	6MKM_If-	https://duolingo.com	0	2	2022-08-08 18:11:58.903129
60	koFbkan8	https://openenglish.com	1	2	2022-08-08 18:14:01.208575
62	wugwQPQn	https://google.com	5	5	2022-08-08 18:56:10.401673
1	6BcoEjCI	https://facebook.com	41	1	2022-08-04 20:13:57.321878
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ridqzhoiqjbawd
--

COPY public.users (id, name, email, password, "createdAt") FROM stdin;
1	daniel	daniel@hotmail.com	$2b$10$limnaFBJ/VtWkksDP0U5yeV5qAs/uysdyY5yqJxI7Bo6wip5EbMyO	2022-08-04 18:28:10.000135
2	lucas	lucas@gmail.com	$2b$10$ALpxM22CuhmHcGcPEynaiubQ6fPbdktvjY3dqDfDO2oeX8RPQ53L2	2022-08-04 18:40:04.043832
3	Joao	joao@driven.com.br	$2b$10$5CWgsZIe4ltZ0Aai3RhfP.soZrvPEZPa.COKL02h.Aq3Giq1OSF6m	2022-08-05 23:12:34.977034
4	lu	lu@gmail.com	$2b$10$LQ4UhAyc8a7f8YTeSq6aY.yvC62VnTLkCZOkLdYUaFcxzdKdHNIU.	2022-08-08 17:51:06.555442
5	luk	luk@gmail.com	$2b$10$6PdVL59X0NXHuo0HITJ82u50Ibvzs0YQmZCVQoRzqmTTAGjhAIDrS	2022-08-08 17:57:22.229721
6	luka	luka@gmail.com	$2b$10$C1XIA/j7bK4JHpw.JlYu2e4Dt/IMrMhIp6KwaAVNGT7idGFKOyUg2	2022-08-08 18:07:35.557921
7	user7	user7@gmail.com	$2b$10$Z98kuHFr9lxF3F3Kq98H..vaOv5H6i7ozblHET7u5yG603N.OSf1e	2022-08-08 18:40:10.965841
8	user8	user8@gmail.com	$2b$10$Cc7PwaXAjeYyEnGuS2ZiGeBg/qXp4hhYU0MXKsXc8hAUQSKDoVxwi	2022-08-08 18:40:16.849949
9	user9	user9@gmail.com	$2b$10$kaLO7RlOcaUyEBHR4IvpuuiyL7E8KDcczs7n.2Ymdk2SBxyEj1cbG	2022-08-08 18:40:22.305943
10	user10	user10@gmail.com	$2b$10$rVL5XZxdN.pW1VQ5FVJEvuoY2dxPPatn.tRsAL5EE8cNxp.L/tb/m	2022-08-08 18:40:29.240087
11	user11	user11@gmail.com	$2b$10$P3wNTXf0SYv13N51lqCi1uZRiK69ogEXQj2Zk08b7kN1uWQzxZ8my	2022-08-08 18:40:34.697869
12	user12	user12@gmail.com	$2b$10$MyWkMyLxNI2.JaQfa6sj6ue9y3B0mOBA3SnE2Wnqt3D/WuyJhLV7O	2022-08-08 18:40:39.367975
13	kleiton	kleiton@gmail.com	$2b$10$0EmVDPG/A0G81MLYs3KMfuGzevp.TcOlMNCwRDYRbWHe02f5T/iQK	2022-08-08 19:54:49.703926
14	kevin	kevin@gmail.com	$2b$10$SMAL70ugheb95OciitqZC.QRC4VKfWsVrQN7cVB7azCi9WBNYjEo6	2022-08-08 20:06:48.569622
15	jesus	jesus@gmail.com	$2b$10$.KyhgFVNhXOkoAcyIeXbK.rDniUuHhhJUB/Z3dj0FETz7nNFpVHGq	2022-08-08 20:21:33.337
16	caleb	caleb@gmail.com	$2b$10$OrLz8vbHPSDVghRsQD6mouMtnDdWXQymq.aB9AWuFwu0mN7pmULYO	2022-08-08 20:27:15.358925
\.


--
-- Name: shortens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ridqzhoiqjbawd
--

SELECT pg_catalog.setval('public.shortens_id_seq', 65, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ridqzhoiqjbawd
--

SELECT pg_catalog.setval('public.users_id_seq', 16, true);


--
-- Name: shortens shortens_pkey; Type: CONSTRAINT; Schema: public; Owner: ridqzhoiqjbawd
--

ALTER TABLE ONLY public.shortens
    ADD CONSTRAINT shortens_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: ridqzhoiqjbawd
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: ridqzhoiqjbawd
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: shortens shortens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ridqzhoiqjbawd
--

ALTER TABLE ONLY public.shortens
    ADD CONSTRAINT "shortens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: SCHEMA heroku_ext; Type: ACL; Schema: -; Owner: u36r0h10i6ah3o
--

GRANT USAGE ON SCHEMA heroku_ext TO ridqzhoiqjbawd;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: ridqzhoiqjbawd
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO ridqzhoiqjbawd;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO ridqzhoiqjbawd;


--
-- PostgreSQL database dump complete
--

