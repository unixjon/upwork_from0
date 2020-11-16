const Projects = require('../models/Projects');



exports.proyectosHome = async (req, res) => {
    const projects = await Projects.findAll();

    res.render('index', {
        nombrePagina : 'Projects',
        projects
    });
}
exports.formproject = async (req, res) => {
    const projects = await Projects.findAll();
    res.render('formproject', {
        nombrePagina : 'Projects',
        projects
    });
}
exports.newproject = async (req, res) => {
    const projects = await Projects.findAll();
    //console.log(req.body);
    const { name } = req.body;

    //creo arreglo de errores
    let errores = [];
    
    if(!name) {
        errores.push({'texto': 'The name field cannot be empty'})
    }

    if(errores.length > 0){
        res.render('formproject', {
            nombrePagina: 'New Project',
            errores,
            projects
        })
    }
    else{
        
        const project = await Projects.create({ name });
        res.redirect('/');

    }
}

exports.projectByUrl = async (req,res, next) => {
    const projects =  Projects.findAll();
    const project =  Projects.findOne({
        where: {
            url: req.params.url
        }
    });

    const [projectspromise, projectpromise] = await Promise.all([projects, project]);

    if(!project) return next();
    
    //render a la vista
    res.render('tareas',{
        nombrePagina: 'Tasks Project',
        project,
        projects
    })
}

exports.editform = async (req, res, next) => {
    const projects = Projects.findAll();
    
    const project = Projects.findOne({
        where: {
            id: req.params.id
        }
    });

    const [projectspromise, projectpromise] = await Promise.all([projects, project]);

    //render a la vista
    res.render('formproject', {
        nombrePagina: 'Edit Project',
        projects

    });
}
