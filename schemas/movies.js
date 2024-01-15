const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required'
  }),
  year: z.number().int().min(1888).max(2024),
  director: z.string(),
  duration: z.number().int().min(1),
  rate: z.number().min(0).max(10),
  poster: z.string().url(),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Film Noir', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Short Film', 'Sport', 'Superhero', 'Thriller', 'War', 'Western']),
    {
      invalid_type_error: 'Genre must be an array of strings',
      required_error: 'Genre is required'
    }
  )
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
