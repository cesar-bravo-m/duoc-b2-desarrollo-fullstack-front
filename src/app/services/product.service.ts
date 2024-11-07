import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: "Set de Libros Básicos de Dungeons & Dragons",
      description: "Contiene Manual del Jugador, Guía del Dungeon Master y Manual de Monstruos",
      price: 169.99,
      imageUrl: "https://placehold.co/400x300/8B4513/FFF?text=D%26D+Set+Básico",
      category: "rpg",
      stock: 15
    },
    {
      id: 2,
      name: "Set de Dados Metálicos - Tesoro del Dragón",
      description: "Set de dados metálicos premium con diseño de escamas de dragón",
      price: 49.99,
      imageUrl: "https://placehold.co/400x300/C0C0C0/000?text=Dados+Metálicos",
      category: "dice",
      stock: 30
    },
    {
      id: 3,
      name: "Juego de Mesa Catan",
      description: "Clásico juego de estrategia de comercio y construcción",
      price: 44.99,
      imageUrl: "https://placehold.co/400x300/DAA520/FFF?text=Catan",
      category: "boardgame",
      stock: 20
    },
    {
      id: 4,
      name: "Mesa de Juego Deluxe",
      description: "Mesa de juego forrada en fieltro con portavasos y bandejas para dados",
      price: 299.99,
      imageUrl: "https://placehold.co/400x300/2F4F4F/FFF?text=Mesa+de+Juego",
      category: "accessory",
      stock: 5
    },
    {
      id: 5,
      name: "Manual Básico de Pathfinder",
      description: "Manual básico de la 2ª Edición de Pathfinder RPG",
      price: 59.99,
      imageUrl: "https://placehold.co/400x300/8B0000/FFF?text=Pathfinder",
      category: "rpg",
      stock: 12
    },
    {
      id: 6,
      name: "Torre de Dados - Diseño Castillo",
      description: "Torre de dados decorativa con tema de castillo medieval",
      price: 34.99,
      imageUrl: "https://placehold.co/400x300/4B0082/FFF?text=Torre+de+Dados",
      category: "accessory",
      stock: 18
    },
    {
      id: 7,
      name: "Gloomhaven",
      description: "Épico juego de mesa de mazmorras basado en campañas",
      price: 139.99,
      imageUrl: "https://placehold.co/400x300/2F4F4F/FFF?text=Gloomhaven",
      category: "boardgame",
      stock: 8
    },
    {
      id: 8,
      name: "Set de Dados de Cristal",
      description: "Dados de cristal artesanales con bolsa de terciopelo",
      price: 89.99,
      imageUrl: "https://placehold.co/400x300/B8860B/FFF?text=Dados+Cristal",
      category: "dice",
      stock: 10
    },
    {
      id: 9,
      name: "Pantalla del Director de Juego",
      description: "Pantalla de DM personalizada de madera con paneles magnéticos",
      price: 79.99,
      imageUrl: "https://placehold.co/400x300/8B4513/FFF?text=Pantalla+DM",
      category: "accessory",
      stock: 15
    },
    {
      id: 10,
      name: "Vampiro: La Mascarada",
      description: "Manual básico de la 5ª Edición",
      price: 54.99,
      imageUrl: "https://placehold.co/400x300/800000/FFF?text=Vampiro",
      category: "rpg",
      stock: 14
    },
    {
      id: 11,
      name: "Pandemic Legacy",
      description: "Temporada 1 - Juego de mesa cooperativo estilo campaña",
      price: 69.99,
      imageUrl: "https://placehold.co/400x300/006400/FFF?text=Pandemic",
      category: "boardgame",
      stock: 11
    },
    {
      id: 12,
      name: "Caja Premium para Dados",
      description: "Caja de madera para dados con inserto de espuma personalizado",
      price: 39.99,
      imageUrl: "https://placehold.co/400x300/8B4513/FFF?text=Caja+Dados",
      category: "accessory",
      stock: 25
    },
    {
      id: 13,
      name: "Warhammer Fantasy Roleplay",
      description: "Manual básico de la 4ª Edición",
      price: 49.99,
      imageUrl: "https://placehold.co/400x300/A0522D/FFF?text=Warhammer",
      category: "rpg",
      stock: 9
    },
    {
      id: 14,
      name: "Set de Pinturas para Miniaturas",
      description: "Pinturas de calidad profesional para miniaturas",
      price: 89.99,
      imageUrl: "https://placehold.co/400x300/4682B4/FFF?text=Set+Pinturas",
      category: "accessory",
      stock: 20
    },
    {
      id: 15,
      name: "Brass Birmingham",
      description: "Juego de mesa de estrategia económica",
      price: 79.99,
      imageUrl: "https://placehold.co/400x300/CD853F/FFF?text=Brass",
      category: "boardgame",
      stock: 7
    },
    {
      id: 16,
      name: "Lanzador de Dados Digital",
      description: "Lanzador de dados electrónico con pantalla LCD",
      price: 29.99,
      imageUrl: "https://placehold.co/400x300/483D8B/FFF?text=Dados+Digital",
      category: "dice",
      stock: 16
    }
  ];

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter(product => product.category === category);
  }
} 