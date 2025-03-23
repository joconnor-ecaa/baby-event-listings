const venues = [
  {
    "name":"Jubilee Children\u2019s Centre",
    "color":"#aae3ff",
    "address":"9 Tulse Hill, SW2 2JE",
    "phone_number":"020 8678 6530",
    "other_notes":null,
    "document_id":"Better%20Start%20BRIXTON_Tulse%20Hill%20Spring%202025"
  },
  {
    "name":"Loughborough Children\u2019s Centre",
    "color":"#b5b1f5",
    "address":"9 Minet Road, SW9 7UA",
    "phone_number":"020 7274 8374",
    "other_notes":null,
    "document_id":"Better%20Start%20BRIXTON_Tulse%20Hill%20Spring%202025"
  },
  {
    "name":"Brockwell Children's Centre (previously the One O\u2019clock Club)",
    "color":"#cd9faf",
    "address":"9 Brockwell Park, Arlingford Road, SW2 2TA",
    "phone_number":"020 8678 6530",
    "other_notes":null,
    "document_id":"Better%20Start%20BRIXTON_Tulse%20Hill%20Spring%202025"
  },
  {
    "name":"Brixton Stockwell Virtual",
    "color":"#ced4d5",
    "address":"online or by phone",
    "phone_number":null,
    "other_notes":null,
    "document_id":"Better%20Start%20BRIXTON_STOCKWELL%20Spring%202025"
  },
  {
    "name":"Jessop Children\u2019s Centre",
    "color":"#aae3ff",
    "address":"9 Lowden Road, SE24 OBJ",
    "phone_number":"020 7737 5164",
    "other_notes":"or 07920 157 180",
    "document_id":"Better%20Start%20BRIXTON_STOCKWELL%20Spring%202025"
  },
  {
    "name":"Liz Atkinson Children\u2019s Centre",
    "color":"#b5b1f5",
    "address":"9 9 Mostyn Road, SW9 6PH",
    "phone_number":"020 4530 5735",
    "other_notes":"or 07572 156 582",
    "document_id":"Better%20Start%20BRIXTON_STOCKWELL%20Spring%202025"
  },
  {
    "name":"Stockwell Children\u2019s Centre",
    "color":"#cd9faf",
    "address":"9 Burgoyne Road, SW9 9QU",
    "phone_number":"020 7326 7328",
    "other_notes":"or 07398 131 353",
    "document_id":"Better%20Start%20BRIXTON_STOCKWELL%20Spring%202025"
  },
  {
    "name":"Mulberry Centre One O\u2019clock Club",
    "color":"#efdab4",
    "address":"9 12 Calais St, SE5 9LP",
    "phone_number":"020 7737 6097",
    "other_notes":null,
    "document_id":"Better%20Start%20BRIXTON_STOCKWELL%20Spring%202025"
  },
  {
    "name":"Slade Gardens Stay and Play One O\u2019clock Club",
    "color":"#efdab4",
    "address":"9 Stockwell Park Road, SWw9 ODB",
    "phone_number":"020 7733 3630",
    "other_notes":null,
    "document_id":"Better%20Start%20BRIXTON_STOCKWELL%20Spring%202025"
  },
  {
    "name":"Larkhall Park Stay and Play One O\u2019clock Club",
    "color":"#efdab4",
    "address":"9 Larkhall Park, SW8 2PD",
    "phone_number":null,
    "other_notes":null,
    "document_id":"Better%20Start%20BRIXTON_STOCKWELL%20Spring%202025"
  },
  {
    "name":"Akerman Health Centre",
    "color":"#cac87b",
    "address":"9 60 Patmos Road, SW9 6AF",
    "phone_number":"020 3049 6500",
    "other_notes":null,
    "document_id":"Better%20Start%20BRIXTON_STOCKWELL%20Spring%202025"
  },
  {
    "name":"Carnegie Library",
    "color":"#abd8c1",
    "address":"9 192 Herne Hill Road SE24 OAG",
    "phone_number":"020 7926 6050",
    "other_notes":null,
    "document_id":"Better%20Start%20BRIXTON_STOCKWELL%20Spring%202025"
  },
  {
    "name":"Brixton Library",
    "color":"#abd8c1",
    "address":"9 Brixton Rd SW2 1JQ",
    "phone_number":"020 7926 1058",
    "other_notes":null,
    "document_id":"Better%20Start%20BRIXTON_STOCKWELL%20Spring%202025"
  },
  {
    "name":"Virtual Session",
    "color":"#ced4d5",
    "address":"online or by phone",
    "phone_number":null,
    "other_notes":"Clapham and Brixton Hill",
    "document_id":"Better%20Start%20CLAPHAM_BRIXTON_HILL%20Spring%202025"
  },
  {
    "name":"Tree House Children\u2019s Centre",
    "color":"#aae3ff",
    "address":"9 66 Upper Tulse Hill, SW2 2RW.",
    "phone_number":"020 8674 6060",
    "other_notes":null,
    "document_id":"Better%20Start%20CLAPHAM_BRIXTON_HILL%20Spring%202025"
  },
  {
    "name":"Clapham Manor at Triangle",
    "color":"#abd8c1",
    "address":"9 Triangle Nursery school, 25 William Bonney Estate Clapham Crescent SW4 7JQ",
    "phone_number":"020 7622 1393",
    "other_notes":null,
    "document_id":"Better%20Start%20CLAPHAM_BRIXTON_HILL%20Spring%202025"
  },
  {
    "name":"Maytree Children\u2019s Centre",
    "color":"#cd9faf",
    "address":"9 4 Allingham Road, SW4 8EG",
    "phone_number":"020 8671 3298",
    "other_notes":null,
    "document_id":"Better%20Start%20CLAPHAM_BRIXTON_HILL%20Spring%202025"
  },
  {
    "name":"Agnes Riley One O\u2019clock Club",
    "color":"#efdab4",
    "address":"9 Atkins Road, SW12 0AH",
    "phone_number":"020 8671 3298",
    "other_notes":null,
    "document_id":"Better%20Start%20CLAPHAM_BRIXTON_HILL%20Spring%202025"
  },
  {
    "name":"The Spinney One O\u2019clock Club",
    "color":"#efdab4",
    "address":"9 Windmill Drive, Clapham Common, SW4 9DE",
    "phone_number":"020 7627 9917",
    "other_notes":null,
    "document_id":"Better%20Start%20CLAPHAM_BRIXTON_HILL%20Spring%202025"
  },
  {
    "name":"Clapham Manor Health Centre",
    "color":"#cac87b",
    "address":"9 86 Clapham Manor St, SW4 6EB",
    "phone_number":"020 7411 6866",
    "other_notes":null,
    "document_id":"Better%20Start%20CLAPHAM_BRIXTON_HILL%20Spring%202025"
  },
  {
    "name":"Clapham Family Practice",
    "color":"#cac87b",
    "address":"9 Mary Seacole Centre 89 Clapham High St, SW4 7DB",
    "phone_number":"020 3049 6600",
    "other_notes":null,
    "document_id":"Better%20Start%20CLAPHAM_BRIXTON_HILL%20Spring%202025"
  },
  {
    "name":"Clapham Library",
    "color":"#c8c6f8",
    "address":"9 Mary Seacole Centre, 91 Clapham High St, SW4 7DB",
    "phone_number":"020 7926 0717",
    "other_notes":null,
    "document_id":"Better%20Start%20CLAPHAM_BRIXTON_HILL%20Spring%202025"
  },
  {
    "name":"Brixton Library",
    "color":"#c8c6f8",
    "address":"9 Brixton Road SW2 1JQ",
    "phone_number":"020 7926 1058",
    "other_notes":null,
    "document_id":"Better%20Start%20CLAPHAM_BRIXTON_HILL%20Spring%202025"
  },
  {
    "name":"North Lambeth cluster",
    "color":"#ced4d5",
    "address":null,
    "phone_number":null,
    "other_notes":"Virtual Session \u2014 online or by phone",
    "document_id":"Better%20Start%20NORTH_LAMBETH%20Spring%202025"
  },
  {
    "name":"Ethelred Children\u2019s Centre",
    "color":"#aae3ff",
    "address":"9 Gundulf St, SE11 6BG",
    "phone_number":"020 7582 9711 Option 2",
    "other_notes":null,
    "document_id":"Better%20Start%20NORTH_LAMBETH%20Spring%202025"
  },
  {
    "name":"Henry Fawcett Children\u2019s Centre",
    "color":"#b5b1f5",
    "address":"9 Clayton St, SE11 5BZ",
    "phone_number":"020 7091 1282",
    "other_notes":null,
    "document_id":"Better%20Start%20NORTH_LAMBETH%20Spring%202025"
  },
  {
    "name":"St Stephen\u2019s Children\u2019s Centre",
    "color":"#cd9faf",
    "address":"9 Meadow Place, SW8 1XY",
    "phone_number":"020 7735 1540",
    "other_notes":null,
    "document_id":"Better%20Start%20NORTH_LAMBETH%20Spring%202025"
  },
  {
    "name":"Mawbey Brough Health Centre",
    "color":"#cac87b",
    "address":"9 39 Wilcox Close, SW8 2UD",
    "phone_number":"020 7411 5720",
    "other_notes":null,
    "document_id":"Better%20Start%20NORTH_LAMBETH%20Spring%202025"
  },
  {
    "name":"Durning Library",
    "color":"#abd8c1",
    "address":"9 167 Kennington Lane SE11 4HF",
    "phone_number":"020 7926 8682",
    "other_notes":null,
    "document_id":"Better%20Start%20NORTH_LAMBETH%20Spring%202025"
  },
  {
    "name":"South Lambeth Library",
    "color":"#abd8c1",
    "address":"9 180 South Lambeth Road, SW8 1QP",
    "phone_number":"020 7926 0710",
    "other_notes":null,
    "document_id":"Better%20Start%20NORTH_LAMBETH%20Spring%202025"
  },
  {
    "name":"Norwood Virtual Session",
    "color":"#c4cbcc",
    "address":"online or by phone",
    "phone_number":null,
    "other_notes":null,
    "document_id":"Better%20Start%20NORWOOD%20Spring%202025"
  },
  {
    "name":"Benton\u2019s Lane Children\u2019s Centre",
    "color":"#aae3ff",
    "address":"9 18 Bentons Lane, SE27 9UD",
    "phone_number":"020 4542 3520",
    "other_notes":null,
    "document_id":"Better%20Start%20NORWOOD%20Spring%202025"
  },
  {
    "name":"Crown Lane Children\u2019s Centre",
    "color":"#b5b1f5",
    "address":"9 Crown Lane, SW16 3HX",
    "phone_number":"020 8761 7139",
    "other_notes":null,
    "document_id":"Better%20Start%20NORWOOD%20Spring%202025"
  },
  {
    "name":"Rosendale Children\u2019s Centre",
    "color":"#cd9faf",
    "address":"9 Rosendale Road, SE21 8LR",
    "phone_number":"020 4542 3520",
    "other_notes":null,
    "document_id":"Better%20Start%20NORWOOD%20Spring%202025"
  },
  {
    "name":"Family Hub Network",
    "color":"#52b27a",
    "address":null,
    "phone_number":null,
    "other_notes":"Start for Life offer",
    "document_id":"Better%20Start%20NORWOOD%20Spring%202025"
  },
  {
    "name":"Streatham Virtual Session",
    "color":"#ced4d5",
    "address":"online or by phone",
    "phone_number":null,
    "other_notes":null,
    "document_id":"Better%20Start%20STREATHAM%20Spring%202025"
  },
  {
    "name":"Hitherfield Children\u2019s Centre",
    "color":"#aae3ff",
    "address":"9 Hitherfield Rd,SW16 2LW",
    "phone_number":"020 8835 9569",
    "other_notes":null,
    "document_id":"Better%20Start%20STREATHAM%20Spring%202025"
  },
  {
    "name":"Streatham Hub Children\u2019s Centre",
    "color":"#b5b1f5",
    "address":"9 388 Streatham High Road,SW16 6HX",
    "phone_number":"020 4548 2561",
    "other_notes":null,
    "document_id":"Better%20Start%20STREATHAM%20Spring%202025"
  },
  {
    "name":"Sunnyhill Children\u2019s Centre",
    "color":"#cd9faf",
    "address":"9 Harborough Road,SW16 2XW",
    "phone_number":"020 4548 2561",
    "other_notes":null,
    "document_id":"Better%20Start%20STREATHAM%20Spring%202025"
  },
  {
    "name":"Hillside Gardens One O\u2019clock Club",
    "color":"#efdab4",
    "address":"9 Hillside Road,SW2 3HL",
    "phone_number":"020 8835 9569",
    "other_notes":null,
    "document_id":"Better%20Start%20STREATHAM%20Spring%202025"
  },
  {
    "name":"Streatham Youth and Community Trust",
    "color":"#cac87b",
    "address":"9 The Hut, Abercairn Rd,SW16 5AL",
    "phone_number":"020 3146 4179",
    "other_notes":null,
    "document_id":"Better%20Start%20STREATHAM%20Spring%202025"
  },
  {
    "name":"Gracefield Gardens Health Centre",
    "color":"#abd8c1",
    "address":"9 2-8 Gracefield Gardens,SW16 2ST",
    "phone_number":"020 3049 5030",
    "other_notes":null,
    "document_id":"Better%20Start%20STREATHAM%20Spring%202025"
  }
]

export default venues;