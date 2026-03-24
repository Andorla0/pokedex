# Crossover Battles

Proyecto desarrollado en React como parte de una prueba técnica para Frontend Developer.

La aplicación permite crear enfrentamientos entre un Pokemon y un personaje de Dragon Ball, ver el detalle de cada battle, editarla y eliminarla.


## Tecnologías usadas

- React
- React Router
- React Query
- React Hook Form
- Zod
- Axios
- Tailwind CSS
- PrimeReact


## APIs usadas

- [PokeAPI](https://pokeapi.co/)
- [Dragon Ball API](https://web.dragonball-api.com/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)


## Qué hace la aplicación
- listar pokemon
- ver detalles de los pokemon
- postear avistamientos
- listar battles creadas
- crear una nueva battle
- ver el detalle de una battle
- editar una battle
- eliminar una battle
- comparar estadísticas entre los personajes seleccionados

## Cosas que se aplicaron

- React Query para consumo de APIs
- React Router para navegación
- React Hook Form + Zod para formularios y validación
- Axios para create, update y delete
- integración de dos APIs
- componentes reutilizables
- manejo de loading, error y empty states


## Estructura general

El proyecto está organizado por features para separar mejor la lógica.

```bash
src/
    app/
    features/
        battles/
            api/
            components/
            hooks/
            schemas/
            utils/
        pokemon/
            pi/
            components/
            hooks/
            schemas/
            utils/
        dragonBall/
            api/
            hooks
    pages/
    components/
    styles/
```
  Desarrollado por Andre Bernaola.