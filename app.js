const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const app=express()
app.use((request,response,next) =>{
    response.header('Access-Control-Allow-Origin','*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())
    next()
})

const controllerAlunos=require('./controller/controller_alunos.js')
const controllerResponsaveis=require('./controller/controller_responsaveis.js')

const bodyParserJSON=bodyParser.json()

app.get('/v1/escolaideal/alunos',cors(),async function(request, response){
    let dadosAlunos=await controllerAlunos.getListarAlunos()
    response.status(dadosAlunos.status_code)
    response.json(dadosAlunos)
})

app.get('/v1/escolaideal/aluno/:id', cors(), async function(request, response){
    let idAluno=request.params.id
    let dadosAluno=await controllerAlunos.getBuscarAlunoPeloID(idAluno)
    response.status(dadosAluno.status_code)
    response.json(dadosAluno)
})

app.get('/v1/escolaideal/alunos/turma/:id', cors(), async function(request, response){
    let idTurma=request.params.id
    let dadosAluno=await controllerAlunos.getBuscarAlunosPelaTurma(idTurma)
    response.status(dadosAluno.status_code)
    response.json(dadosAluno)
})

app.post('/v1/escolaideal/aluno/insert',cors(), bodyParserJSON, async function(request, response){
    let contentType=request.headers['content-type']
    let dadosBody=request.body
    let resultDadosNovoAluno=await controllerAlunos.setInserirNovoAluno(dadosBody, contentType)
    response.status(resultDadosNovoAluno.status_code)
    response.json(resultDadosNovoAluno)
})

app.put('/v1/escolaideal/aluno/update/:id', cors(), bodyParserJSON, async function(request, response){
    let idAluno=request.params.id
    let contentType=request.headers['content-type']
    let dadosBody=request.body
    let resultDadosAlunoAtualizado=await controllerAlunos.setAtualizarAluno(idAluno, dadosBody, contentType)
    response.status(resultDadosAlunoAtualizado.status_code)
    response.json(resultDadosAlunoAtualizado)
})

app.delete('/v1/escolaideal/aluno/delete/:id', cors(), async function(request, response){
    let idAluno=request.params.id
    let resultAlunoDeletado=await controllerAlunos.setDeletarAluno(idAluno)
    response.status(resultAlunoDeletado.status_code)
    response.json(resultAlunoDeletado)
})

app.get('/v1/escolaideal/responsaveis',cors(),async function(request, response){
    let dadosResponsaveis=await controllerResponsaveis.getListarResponsaveis()
    response.status(dadosResponsaveis.status_code)
    response.json(dadosResponsaveis)
})

app.post('/v1/escolaideal/responsavel/insert',cors(), bodyParserJSON, async function(request, response){
    let contentType=request.headers['content-type']
    let dadosBody=request.body
    let resultDadosNovoAluno=await controllerResponsaveis.setInserirNovoResponsavel(dadosBody, contentType)
    response.status(resultDadosNovoAluno.status_code)
    response.json(resultDadosNovoAluno)
})

app.listen('8080',function(){
    console.log('API no ar!!!')
})