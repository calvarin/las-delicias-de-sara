// Precios en céntimos. spriteIndex: posición fija, empezando por cero.
const products = [
  {
    "id": "P001",
    "name": "Bravas",
    "category": "Entrantes",
    "priceCents": 325,
    "spriteIndex": 0
  },
  {
    "id": "P002",
    "name": "Nachos con guacamole",
    "category": "Entrantes",
    "priceCents": 210,
    "spriteIndex": 1
  },
  {
    "id": "P003",
    "name": "Fingers de queso",
    "category": "Entrantes",
    "priceCents": 370,
    "spriteIndex": 2
  },
  {
    "id": "P004",
    "name": "Nuggets",
    "category": "Entrantes",
    "priceCents": 200,
    "spriteIndex": 3
  },
  {
    "id": "P005",
    "name": "Pan con alioli y tomate",
    "category": "Entrantes",
    "priceCents": 325,
    "spriteIndex": 4
  },
  {
    "id": "P006",
    "name": "Tabla de quesos",
    "category": "Entrantes",
    "priceCents": 420,
    "spriteIndex": 5
  },
  {
    "id": "P007",
    "name": "Limonada",
    "category": "Bebidas",
    "priceCents": 150,
    "spriteIndex": 6
  },
  {
    "id": "P008",
    "name": "Batido de frutas",
    "category": "Bebidas",
    "priceCents": 200,
    "spriteIndex": 7
  },
  {
    "id": "P009",
    "name": "Agua",
    "category": "Bebidas",
    "priceCents": 100,
    "spriteIndex": 8
  },
  {
    "id": "P010",
    "name": "Leche",
    "category": "Bebidas",
    "priceCents": 110,
    "spriteIndex": 9
  },
  {
    "id": "P011",
    "name": "Chocolate caliente",
    "category": "Bebidas",
    "priceCents": 185,
    "spriteIndex": 10
  },
  {
    "id": "P012",
    "name": "Agua con gas",
    "category": "Bebidas",
    "priceCents": 110,
    "spriteIndex": 11
  },
  {
    "id": "P013",
    "name": "Red Bull",
    "category": "Bebidas",
    "priceCents": 200,
    "spriteIndex": 12
  },
  {
    "id": "P014",
    "name": "Monster",
    "category": "Bebidas",
    "priceCents": 200,
    "spriteIndex": 13
  },
  {
    "id": "P015",
    "name": "Ketchup",
    "category": "Salsas",
    "priceCents": 50,
    "spriteIndex": 14
  },
  {
    "id": "P016",
    "name": "Barbacoa",
    "category": "Salsas",
    "priceCents": 50,
    "spriteIndex": 15
  },
  {
    "id": "P017",
    "name": "Sopa",
    "category": "Primeros",
    "priceCents": 350,
    "spriteIndex": 16
  },
  {
    "id": "P018",
    "name": "Puré",
    "category": "Primeros",
    "priceCents": 400,
    "spriteIndex": 17
  },
  {
    "id": "P019",
    "name": "Espaguetis con tomate",
    "category": "Primeros",
    "priceCents": 500,
    "spriteIndex": 18
  },
  {
    "id": "P020",
    "name": "Macarrones boloñesa",
    "category": "Primeros",
    "priceCents": 510,
    "spriteIndex": 19
  },
  {
    "id": "P021",
    "name": "Ensalada",
    "category": "Primeros",
    "priceCents": 350,
    "spriteIndex": 20
  },
  {
    "id": "P022",
    "name": "Arroz a la cubana",
    "category": "Primeros",
    "priceCents": 410,
    "spriteIndex": 21
  },
  {
    "id": "P023",
    "name": "Lentejas",
    "category": "Primeros",
    "priceCents": 320,
    "spriteIndex": 22
  },
  {
    "id": "P024",
    "name": "Garbanzos",
    "category": "Primeros",
    "priceCents": 290,
    "spriteIndex": 23
  },
  {
    "id": "P025",
    "name": "Alubias",
    "category": "Primeros",
    "priceCents": 290,
    "spriteIndex": 24
  },
  {
    "id": "P026",
    "name": "Fideos chinos",
    "category": "Primeros",
    "priceCents": 325,
    "spriteIndex": 25
  },
  {
    "id": "P027",
    "name": "Verduras al vapor",
    "category": "Primeros",
    "priceCents": 350,
    "spriteIndex": 26
  },
  {
    "id": "P028",
    "name": "Hamburguesa",
    "category": "Segundos",
    "priceCents": 735,
    "spriteIndex": 27
  },
  {
    "id": "P029",
    "name": "Huevos con salchichas",
    "category": "Segundos",
    "priceCents": 350,
    "spriteIndex": 28
  },
  {
    "id": "P030",
    "name": "Filete con guarnición",
    "category": "Segundos",
    "priceCents": 735,
    "spriteIndex": 29
  },
  {
    "id": "P031",
    "name": "Pollo asado con patatas",
    "category": "Segundos",
    "priceCents": 420,
    "spriteIndex": 30
  },
  {
    "id": "P032",
    "name": "Tortillas variadas",
    "category": "Segundos",
    "priceCents": 400,
    "spriteIndex": 31
  },
  {
    "id": "P033",
    "name": "Pizza familiar",
    "category": "Segundos",
    "priceCents": 515,
    "spriteIndex": 32
  },
  {
    "id": "P034",
    "name": "Fingers de queso",
    "category": "Menú infantil",
    "priceCents": 370,
    "spriteIndex": 33
  },
  {
    "id": "P035",
    "name": "Nuggets",
    "category": "Menú infantil",
    "priceCents": 200,
    "spriteIndex": 34
  },
  {
    "id": "P036",
    "name": "Tarta",
    "category": "Postres",
    "priceCents": 300,
    "spriteIndex": 35
  },
  {
    "id": "P037",
    "name": "Donut",
    "category": "Postres",
    "priceCents": 210,
    "spriteIndex": 36
  },
  {
    "id": "P038",
    "name": "Gofre",
    "category": "Postres",
    "priceCents": 150,
    "spriteIndex": 37
  },
  {
    "id": "P039",
    "name": "Helado",
    "category": "Postres",
    "priceCents": 200,
    "spriteIndex": 38
  },
  {
    "id": "P040",
    "name": "Café",
    "category": "Postres",
    "priceCents": 205,
    "spriteIndex": 39
  },
  {
    "id": "P041",
    "name": "Té",
    "category": "Postres",
    "priceCents": 210,
    "spriteIndex": 40
  },
  {
    "id": "P042",
    "name": "Cruasán",
    "category": "Postres",
    "priceCents": 175,
    "spriteIndex": 41
  },
  {
    "id": "P043",
    "name": "Trenza",
    "category": "Postres",
    "priceCents": 150,
    "spriteIndex": 42
  },
  {
    "id": "P044",
    "name": "Madalena",
    "category": "Postres",
    "priceCents": 50,
    "spriteIndex": 43
  },
  {
    "id": "P045",
    "name": "Macaron",
    "category": "Postres",
    "priceCents": 115,
    "spriteIndex": 44
  },
  {
    "id": "P046",
    "name": "Muffin",
    "category": "Postres",
    "priceCents": 230,
    "spriteIndex": 45
  },
  {
    "id": "P047",
    "name": "Pastel",
    "category": "Postres",
    "priceCents": 350,
    "spriteIndex": 46
  },
  {
    "id": "P048",
    "name": "Capuchino",
    "category": "Postres",
    "priceCents": 300,
    "spriteIndex": 47
  },
  {
    "id": "P049",
    "name": "Corazón chocolate",
    "category": "Postres",
    "priceCents": 150,
    "spriteIndex": 48
  },
  {
    "id": "P050",
    "name": "Canastillo chocolate",
    "category": "Postres",
    "priceCents": 355,
    "spriteIndex": 49
  },
  {
    "id": "P051",
    "name": "Yogur con cereales",
    "category": "Postres",
    "priceCents": 215,
    "spriteIndex": 50
  }
];
