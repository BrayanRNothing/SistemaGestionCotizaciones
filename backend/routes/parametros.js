import express from 'express';

const router = express.Router();

export default (pool) => {
  // GET: Obtener todos los tipos de solicitud
  router.get('/tipos-solicitud', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM tipos_solicitud ORDER BY id ASC');
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener tipos de solicitud' });
    }
  });

  // POST: Crear un nuevo tipo de solicitud
  router.post('/tipos-solicitud', async (req, res) => {
    const { nombre, descripcion, icono, color } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO tipos_solicitud (nombre, descripcion, icono, color) VALUES ($1, $2, $3, $4) RETURNING *',
        [nombre, descripcion, icono, color]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear tipo de solicitud' });
    }
  });

  // DELETE: Eliminar un tipo de solicitud
  router.delete('/tipos-solicitud/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM tipos_solicitud WHERE id = $1', [id]);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar tipo de solicitud' });
    }
  });

  return router;
};
