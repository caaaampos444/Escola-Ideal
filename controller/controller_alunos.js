const e = require('express')
const alunoDAO=require('../model/DAO/alunos.js')
const message=require('../module/config.js')

const setInserirNovoAluno=async function(dadosAluno, contentType){
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            let novoAlunoJSON={}
            if(
                dadosAluno.nome==''            || dadosAluno.nome==undefined            || dadosAluno.nome==null            || dadosAluno.nome.length>100            ||
                dadosAluno.data_nascimento=='' || dadosAluno.data_nascimento==undefined || dadosAluno.data_nascimento==null || dadosAluno.data_nascimento.length!=10 ||
                dadosAluno.email==''           || dadosAluno.email==undefined           || dadosAluno.email==null           || dadosAluno.email.length>100           ||
                dadosAluno.foto==''            || dadosAluno.foto==undefined            || dadosAluno.foto==null            || dadosAluno.foto.length>300            ||
                dadosAluno.cpf==''             || dadosAluno.cpf==undefined             || dadosAluno.cpf==null             || dadosAluno.cpf.length!=11             ||
                dadosAluno.id_sexo==''         || dadosAluno.id_sexo==undefined         || dadosAluno.id_sexo==null         || dadosAluno.id_sexo>2                  ||
                dadosAluno.endereco==''        || dadosAluno.endereco==undefined        || dadosAluno.endereco==null               
            )
                return message.ERROR_REQUIRED_FIELDS
            else{
                let novoAluno=await alunoDAO.insertAluno(dadosAluno)
                if(novoAluno){
                    let ultimoID=await alunoDAO.selectLastID()
                    novoAlunoJSON={
                        aluno: dadosAluno,
                        status: message.SUCCESS_CREATED_ITEM.status,
                        status_code: message.SUCCESS_CREATED_ITEM.status_code,
                        message: message.SUCCESS_CREATED_ITEM.message,
                        id: ultimoID[0].id
                    }
                    return novoAlunoJSON
                }
                else
                    return message.ERROR_INTERNAL_SERVER_DB
            }
        }
        else
            return message.ERROR_CONTENT_TYPE
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarAluno=async function(id, dadosAluno, contentType){
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            let idAluno=id
            if(idAluno==''||idAluno==undefined||isNaN(idAluno)||idAluno==null)
                return message.ERROR_INVALID_ID
            else{
                let aluno=await alunoDAO.selectByIDAluno(idAluno)
                if(aluno){
                    let alunoAtualizadoJSON={}
                    let alunoAtualizado=await alunoDAO.updateAluno(idAluno, dadosAluno)
                    if(alunoAtualizado){
                        alunoAtualizadoJSON.aluno=dadosAluno
                        alunoAtualizadoJSON.status=message.SUCCES_UPDATED_ITEM.status
                        alunoAtualizadoJSON.status_code=message.SUCCES_UPDATED_ITEM.status_code
                        alunoAtualizadoJSON.message=message.SUCCES_UPDATED_ITEM.message
                        return alunoAtualizadoJSON
                    }
                    else
                        return message.ERROR_INTERNAL_SERVER_DB
                }
                else
                    return message.ERROR_NOT_FOUND
            }
        }
        else
            return message.ERROR_CONTENT_TYPE
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setDeletarAluno=async function(id){
    try {
        let idAluno=id
        if(idAluno==''||idAluno==null||idAluno==undefined)
            return message.ERROR_INVALID_ID
        else{
            let verificaAluno=await alunoDAO.selectByIDAluno(idAluno)
            if(verificaAluno.length<1)
                return message.ERROR_NOT_FOUND
            else{
                let comando=await alunoDAO.deleteAluno(id)
                if(comando)
                    return message.SUCCESS_DELETED_ITEM
                else
                    return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getListarAlunos=async function(){
    try {
        let alunosJSON={}
        let dadosAlunos=await alunoDAO.selectAllAlunos()
        if(dadosAlunos){
            alunosJSON.alunos=dadosAlunos
            alunosJSON.quantidade=dadosAlunos.length
            alunosJSON.status_code=200
            return alunosJSON
        }else
            return message.ERROR_INTERNAL_SERVER_DB
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarAlunoPeloID=async function(id){
    try {
        let idAluno=id
        let alunosJSON={}
        if(idAluno==''||idAluno==undefined||isNaN(idAluno))
            return message.ERROR_INVALID_ID
        else{
            let dadosAluno=await alunoDAO.selectByIDAluno(idAluno)
            if(dadosAluno){
                if(dadosAluno.length>0){
                    alunosJSON.aluno=dadosAluno
                    alunosJSON.status_code=200
                    return alunosJSON
                }else
                    return message.ERROR_NOT_FOUND
            }else
                return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarAlunosPelaTurma=async function(id){
    try {
        let idTurma=id
        let alunosJSON={}
        if(idTurma==''||idTurma==undefined||isNaN(idTurma))
            return message.ERROR_INVALID_ID
        else{
            let listaAlunos=await alunoDAO.selectByTurmaAlunos(idTurma)
            if(listaAlunos){
                if(listaAlunos.length>0){
                    alunosJSON.alunos=listaAlunos
                    alunosJSON.status_code=200
                    return alunosJSON
                }
                else
                    return message.ERROR_NOT_FOUND
            }
            else
                return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports={
    setInserirNovoAluno,
    setAtualizarAluno,
    setDeletarAluno,
    getListarAlunos,
    getBuscarAlunoPeloID,
    getBuscarAlunosPelaTurma
}