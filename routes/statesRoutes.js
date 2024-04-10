const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: 'public/images/' });

// Import the controller
const statesController = require('../controllers/statesController');

// Define routes using the controllers
/**
 * @swagger
 * /states:
 *   get:
 *     summary: Obtiene una lista de todos los estados
 *     tags:
 *       - States
 *     responses:
 *       200:
 *         description: Una lista de estados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/States'
 */
router.get('/states', async (req, res) => {
    const states = await statesController.getAllStates()
    if (states.error) {
        res.status(500).json({ message: states.error });
    } else {
        res.json(states);
    }
});

/**
 * @swagger
 * /states/{id}:
 *   get:
 *     summary: Obtiene los detalles de un estado específico por su ID
 *     tags:
 *       - States
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del estado
 *     responses:
 *       200:
 *         description: Los detalles de un estado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/States'
 *       404:
 *         description: Estado no encontrado
 */
router.get('/states/:id', async (req, res) => {
    const states = await statesController.getStateDetailsById(req.params.id)
    if (states.error) {
        res.status(500).json({ message: states.error });
    } else {
        res.json(states);
    }
});

/**
 * @swagger
 * /states/create:
 *   post:
 *     summary: Crea un nuevo estado
 *     tags:
 *       - States
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/States'
 *     responses:
 *       200:
 *         description: El estado se ha creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/States'
 *       500:
 *         description: Error al crear el estado
 */
router.post('/states/create', async (req, res) => {
    const state_name = req.body.state_name;
    const state_capital = req.body.state_capital;
    const state_population = req.body.state_population;
    const state_special_fact = req.body.state_special_fact;
    const state_image_url = req.body.state_image_url;

    const state = await statesController.createState(
        state_name,
        state_capital,
        state_population,
        state_special_fact,
        state_image_url)

    if (state.error) {
        res.status(500).json({ message: state.error });
    } else {
        res.json(state);
    }
});

/**
 * @swagger
 * /states/{id}:
 *   put:
 *     summary: Actualiza los detalles de un estado específico
 *     tags:
 *       - States
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del estado a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               state_name:
 *                 type: string
 *                 description: El nombre del estado.
 *               state_capital:
 *                 type: string
 *                 description: La capital del estado.
 *               state_population:
 *                 type: integer
 *                 description: La población del estado.
 *               state_special_fact:
 *                 type: string
 *                 description: Un hecho especial sobre el estado.
 *               state_image_url:
 *                 type: string
 *                 description: La URL de la imagen del estado. Puede ser un archivo para cargar.
 *             required:
 *               - state_name
 *               - state_capital
 *     responses:
 *       200:
 *         description: El estado se ha actualizado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/States'
 *       500:
 *         description: Error al actualizar el estado.
 */
router.put('/states/:id', upload.single('file'), async (req, res) => {
    const { state_name, state_capital, state_population, state_special_fact } = req.body;
    const state_image_url = req.file ? req.file.path : '';
    const stateId = req.params.id;

    const updated = await statesController.updateState(
        stateId,
        state_name,
        state_capital,
        state_population,
        state_special_fact,
        state_image_url
    );

    if (updated.error) {
        res.status(500).json({ message: updated.error });
    } else {
        res.json(updated);
    }
});

/**
 * @swagger
 * /states/{id}:
 *   delete:
 *     summary: Elimina un estado específico por su ID
 *     tags:
 *       - States
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del estado a eliminar
 *     responses:
 *       200:
 *         description: El estado se ha eliminado con éxito.
 *       500:
 *         description: Error al eliminar el estado o el estado no existe.
 */
router.delete('/states/:id', async (req, res) => {
    const stateID = req.params.id;

    const deleted = await statesController.deleteState(stateID)

    if (deleted.error) {
        res.status(500).json({ message: deleted.error });
    } else if (deleted === 0) {
        res.status(500).json({ message: `State with id ${stateID} does not exist` });
    } {
        res.json({ stateID, deleted });
    }
});

module.exports = router;