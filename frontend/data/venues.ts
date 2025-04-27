const venues = [
  {
    "name":"Jubilee Children's Centre",
    "address":"Tulse Hill, SW2 2JE",
    "phone_number":"020 8678 6530",
    "other_notes":null
  },
  {
    "name":"Loughborough Children's Centre",
    "address":"Minet Road, SW9 7UA",
    "phone_number":"020 7274 8374",
    "other_notes":null
  },
  {
    "name":"Brockwell Children's Centre",
    "address":"Brockwell Park, Arlingford Road, SW2 2TA",
    "phone_number":"020 8678 6530",
    "other_notes":"(previously the One O'clock Club)"
  },
  {
    "name":"Brixton Stockwell Virtual Session",
    "address":null,
    "phone_number":null,
    "other_notes":"online or by phone"
  },
  {
    "name":"Jessop Children's Centre",
    "address":"Lowden Road, SE24 OBJ",
    "phone_number":"020 7737 5164",
    "other_notes":"07920 157 180"
  },
  {
    "name":"Liz Atkinson Children's Centre",
    "address":"9 Mostyn Road, SW9 6PH",
    "phone_number":"020 4530 5735",
    "other_notes":"07572 156 582"
  },
  {
    "name":"Stockwell Children's Centre",
    "address":"Burgoyne Road, SW9 9QJ",
    "phone_number":"020 7326 7328",
    "other_notes":"07398 131 353"
  },
  {
    "name":"Mulberry Centre",
    "address":"12 Calais St, SE5 9LP",
    "phone_number":"020 7737 6097",
    "other_notes":"One O'clock Club"
  },
  {
    "name":"Slade Gardens Stay and Play",
    "address":"Stockwell Park Road, SW9 0DB",
    "phone_number":"020 7733 3630",
    "other_notes":"One O'clock Club"
  },
  {
    "name":"Larkhall Park Stay and Play",
    "address":"Larkhall Park, SW8 2PD",
    "phone_number":null,
    "other_notes":"One O'clock Club"
  },
  {
    "name":"Akerman Health Centre",
    "address":"60 Patmos Road, SW9 6AF",
    "phone_number":"020 3049 6500",
    "other_notes":null
  },
  {
    "name":"Carnegie Library",
    "address":"192 Herne Hill Road, SE24 0AG",
    "phone_number":"020 7926 6050",
    "other_notes":null
  },
  {
    "name":"Brixton Library",
    "address":"Brixton Road, SW2 1JQ",
    "phone_number":"020 7926 1058",
    "other_notes":null
  },
  {
    "name":"Mulberry Centre One O'clock Club",
    "address":"12 Calais St, SE5 9LP",
    "phone_number":"020 7737 6097",
    "other_notes":null
  },
  {
    "name":"Slade Gardens Stay and Play One O'clock Club",
    "address":"Stockwell Park Road, SW9 0DB",
    "phone_number":"020 7733 3630",
    "other_notes":null
  },
  {
    "name":"Larkhall Park Stay and Play One O'clock Club",
    "address":"Larkhall Park, SW8 2PD",
    "phone_number":null,
    "other_notes":null
  },
  {
    "name":"Children's Centres",
    "address":null,
    "phone_number":null,
    "other_notes":"Various locations across the borough offer a range of services including baby sessions, stay and play, communication and language groups, ESOL classes, adult learning, parenting support, employment support, and financial support."
  },
  {
    "name":"St Michael's Fellowship",
    "address":null,
    "phone_number":"020 8835 9570",
    "other_notes":"Provides support for young parents."
  },
  {
    "name":"Evelina London",
    "address":null,
    "phone_number":null,
    "other_notes":"Health Visiting team runs child health clinics (currently by appointment only)."
  },
  {
    "name":"Brixton Market stalls",
    "address":null,
    "phone_number":null,
    "other_notes":"Accept Alexandra Rose Vouchers for fresh fruit and vegetables."
  },
  {
    "name":"Norwood Market stalls",
    "address":null,
    "phone_number":null,
    "other_notes":"Accept Alexandra Rose Vouchers for fresh fruit and vegetables."
  },
  {
    "name":"East Street Market stalls",
    "address":null,
    "phone_number":null,
    "other_notes":"Accept Alexandra Rose Vouchers for fresh fruit and vegetables."
  },
  {
    "name":"Peckham Market stalls",
    "address":null,
    "phone_number":null,
    "other_notes":"Accept Alexandra Rose Vouchers for fresh fruit and vegetables."
  },
  {
    "name":"Waterloo Market stalls",
    "address":null,
    "phone_number":null,
    "other_notes":"Accept Alexandra Rose Vouchers for fresh fruit and vegetables."
  },
  {
    "name":"Food Bank",
    "address":null,
    "phone_number":null,
    "other_notes":"Local Food Bank supports in accessing food."
  },
  {
    "name":"Brockwell Children's Centre (previously the One O'clock Club)",
    "address":"Brockwell Park, Arlingford Road, SW2 2TA",
    "phone_number":"020 8678 6530",
    "other_notes":null
  },
  {
    "name":"Hightrees",
    "address":null,
    "phone_number":null,
    "other_notes":null
  },
  {
    "name":"Children's centres",
    "address":null,
    "phone_number":null,
    "other_notes":"Various locations across the borough"
  },
  {
    "name":"Brixton Market",
    "address":null,
    "phone_number":null,
    "other_notes":null
  },
  {
    "name":"Norwood Market",
    "address":null,
    "phone_number":null,
    "other_notes":null
  },
  {
    "name":"East Street Market",
    "address":null,
    "phone_number":null,
    "other_notes":null
  },
  {
    "name":"Peckham Market",
    "address":null,
    "phone_number":null,
    "other_notes":null
  },
  {
    "name":"Waterloo Market",
    "address":null,
    "phone_number":null,
    "other_notes":null
  },
  {
    "name":"Tree House Children's Centre",
    "address":"66 Upper Tulse Hill, SW2 2R",
    "phone_number":"020 8674 6060",
    "other_notes":null
  },
  {
    "name":"Clapham Manor at Triangle",
    "address":"Triangle Nursery school, 25 William Bonney Estate Clapham Crescent SW4 7JQ",
    "phone_number":"020 7622 1393",
    "other_notes":null
  },
  {
    "name":"Maytree Children's Centre",
    "address":"4 Allingham Road, SW4 8EG",
    "phone_number":"020 8671 3298",
    "other_notes":null
  },
  {
    "name":"Agnes Riley One O'clock Club",
    "address":"Atkins Road, SW12 0AH",
    "phone_number":"020 8671 3298",
    "other_notes":null
  },
  {
    "name":"The Spinney One O'clock Club",
    "address":"Windmill Drive, Clapham Common, SW4 9DE",
    "phone_number":"020 7627 9917",
    "other_notes":null
  },
  {
    "name":"Clapham Manor Health Centre",
    "address":"86 Clapham Manor St, SW4 6EB",
    "phone_number":"020 7411 6866",
    "other_notes":null
  },
  {
    "name":"Clapham Family Practice",
    "address":"Mary Seacole Centre, 89 Clapham High St, SW4 7DB",
    "phone_number":"020 3049 6600",
    "other_notes":null
  },
  {
    "name":"Clapham Library",
    "address":"Mary Seacole Centre, 91 Clapham High St, SW4 7DB",
    "phone_number":"020 7926 0717",
    "other_notes":null
  },
  {
    "name":"North Lambeth cluster virtual session",
    "address":null,
    "phone_number":null,
    "other_notes":"online or by phone"
  },
  {
    "name":"Ethelred Children's Centre",
    "address":"1 Gundulf St, SE11 6BG",
    "phone_number":"020 7582 9711",
    "other_notes":"Option 2"
  },
  {
    "name":"Henry Fawcett Children's Centre",
    "address":"Clayton St, SE11 5BZ",
    "phone_number":"020 7091 1282",
    "other_notes":null
  },
  {
    "name":"St Stephen's Children's Centre",
    "address":"Meadow Place, SW8 1XY",
    "phone_number":"020 7735 1540",
    "other_notes":null
  },
  {
    "name":"Mawbey Brough Health Centre",
    "address":"39 Wilcox Close, SW8 2UD",
    "phone_number":"020 7411 5720",
    "other_notes":null
  },
  {
    "name":"Waterloo Library",
    "address":"1 Kennington Road, SE1 7QP",
    "phone_number":"020 7926 8751",
    "other_notes":null
  },
  {
    "name":"Durning Library",
    "address":"167 Kennington Lane, SE11 4HF",
    "phone_number":"020 7926 8682",
    "other_notes":null
  },
  {
    "name":"Tate South Lambeth Library",
    "address":"180 South Lambeth Road,\n    SW8 1QP",
    "phone_number":"020 7926 0710",
    "other_notes":null
  },
  {
    "name":"Norwood Virtual Session",
    "address":null,
    "phone_number":null,
    "other_notes":"online or by phone"
  },
  {
    "name":"Benton's Lane Children's Centre",
    "address":"18 Bentons Lane, SE27 9UD",
    "phone_number":"020 4542 3520",
    "other_notes":null
  },
  {
    "name":"Crown Lane Children's Centre",
    "address":"Crown Lane, SW16 3HX",
    "phone_number":"0204 542 3520",
    "other_notes":null
  },
  {
    "name":"Rosendale Children's Centre",
    "address":"Rosendale Road, SE21 8LR",
    "phone_number":"020 4542 3520",
    "other_notes":null
  },
  {
    "name":"Hitherfield Children's Centre",
    "address":"Hitherfield Rd, SW16 2LW",
    "phone_number":"020 8835 9569",
    "other_notes":null
  },
  {
    "name":"Streatham Hub Children's Centre",
    "address":"388 Streatham High Road, SW16 6HX",
    "phone_number":"020 4548 2561",
    "other_notes":null
  },
  {
    "name":"Sunnyhill Children's Centre",
    "address":"Harborough Road, SW16 2XW",
    "phone_number":"020 4548 2561",
    "other_notes":null
  },
  {
    "name":"Hillside Gardens One O'clock Club",
    "address":"Hillside Road, SW2 3HL",
    "phone_number":"020 8835 9569",
    "other_notes":null
  },
  {
    "name":"Streatham Youth and Community Trust",
    "address":"The Hut, Abercairn Rd, SW16 5AL",
    "phone_number":"020 3146 4179",
    "other_notes":null
  },
  {
    "name":"Gracefield Gardens Health Centre",
    "address":"2-8 Gracefield Gardens, SW16 2ST",
    "phone_number":"020 3049 5030",
    "other_notes":null
  },
  {
    "name":"Virtual Session",
    "address":null,
    "phone_number":null,
    "other_notes":"online or by phone"
  },
  {
    "name":"Streatham Virtual Session",
    "address":"online or by phone",
    "phone_number":null,
    "other_notes":null
  },
  {
    "name":"Streatham Hub\nChildren's Centre",
    "address":"388 Streatham High Road,\nSW16 6HX",
    "phone_number":"020 4548 2561",
    "other_notes":null
  },
  {
    "name":"Hillside Gardens\nOne O'clock Club",
    "address":"Hillside Road, SW2 3HL",
    "phone_number":"020 8835 9569",
    "other_notes":null
  },
  {
    "name":"Streatham Youth and\nCommunity Trust",
    "address":"The Hut, Abercairn Rd,\nSW16 5AL",
    "phone_number":"020 3146 4179",
    "other_notes":null
  },
  {
    "name":"Gracefield Gardens\nHealth Centre",
    "address":"2-8 Gracefield Gardens,\nSW16 2ST",
    "phone_number":"020 3049 5030",
    "other_notes":null
  },
  {
    "name":"Felix Food Project",
    "address":null,
    "phone_number":null,
    "other_notes":null
  }
]

export default venues;