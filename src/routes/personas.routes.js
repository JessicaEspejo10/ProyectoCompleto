import {Router} from 'express'
import pool from '../database.js' ;
import multer from 'multer';
import path from 'path';

const router = Router();

const storage = multer.diskStorage({
    destination: 'src/public/uploads/',
    filename: (req,file,cb) => {
        const uniqueSuffix = Date.now() + '-' +  Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({storage});

router.get('/add', (req,res) => {
    res.render('personas/add');
});

//segundo parametro es una middleware
router.post('/add', upload.single('file'), async(req,res) => {
    try{
        const {name,lastname,age,detail} = req.body;
        let newPersona={};

        if(req.file){
            const file = req.file;   
            const original_imgname = file.originalname;           
            const image = file.filename;

            newPersona = {
                name, lastname,age,detail,image
            }
        }else{
            newPersona = {
                name, lastname,age,detail
            }
        }
        
        await pool.query('INSERT INTO personas SET ?', [newPersona]);
        res.redirect('/list');

    }catch(error){
        res.status(500).json({message: error.message});
    }
});

router.get('/list',async(req,res) => {
    try{
        const [result] = await pool.query('SELECT * FROM personas');
        res.render('personas/list',{personas: result});
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

router.get('/delete/:id', async(req,res) => {
    try{
        const {id} = req.params
        await pool.query('DELETE FROM personas WHERE id=?', [id]);
        res.redirect('/list');
    }catch(error){
        res.status(500).json({message: error.message});
    };
});

router.get('/edit/:id', async(req,res) => {
    try{
        const{id} = req.params
        const [persona] = await pool.query('SELECT * FROM personas WHERE id = ?', [id]);
        const personaEdit = persona[0];
        res.render('personas/edit',{persona: personaEdit});
        
    }catch(error){
        res.status(500).json({message: error.message});
    };
});

router.post('/edit/:id', upload.single('file'), async(req,res) => {
    try{
        const{id} = req.params
        const{name,lastname,age,detail} = req.body
        let editPersona = {}

        if(req.file){
            const file = req.file;   
            const original_imgname = file.originalname;           
            const image = file.filename;

            editPersona = {
                name, lastname,age,detail,image
            }
        }else{
            editPersona = {
                name, lastname,age,detail
            }
        }

        await pool.query('UPDATE personas SET ? WHERE id = ?', [editPersona,id]);
        res.redirect('/list');

    }catch(error){
        res.status(500).json({message: error.message});
    }
});

export default router;