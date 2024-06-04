const e = require('express')
const responsavelDAO=require('../model/DAO/responsaveis.js')
const message=require('../module/config.js')

const setInserirNovoResponsavel=async function(dadosResponsavel, contentType){
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            let novoResponsavelJSON={}
            if(
                dadosResponsavel.nome==''            || dadosResponsavel.nome==undefined            || dadosResponsavel.nome==null            || dadosResponsavel.nome.length>100            ||
                dadosResponsavel.data_nascimento=='' || dadosResponsavel.data_nascimento==undefined || dadosResponsavel.data_nascimento==null || dadosResponsavel.data_nascimento.length!=10 ||
                dadosResponsavel.email==''           || dadosResponsavel.email==undefined           || dadosResponsavel.email==null           || dadosResponsavel.email.length>100           ||
                dadosResponsavel.telefone==''        || dadosResponsavel.telefone==undefined        || dadosResponsavel.telefone==null        || dadosResponsavel.telefone.length>300        ||
                dadosResponsavel.cpf==''             || dadosResponsavel.cpf==undefined             || dadosResponsavel.cpf==null             || dadosResponsavel.cpf.length!=11             ||
                dadosResponsavel.id_sexo==''         || dadosResponsavel.id_sexo==undefined         || dadosResponsavel.id_sexo==null         || dadosResponsavel.id_sexo>2                  ||
                dadosResponsavel.endereco==''        || dadosResponsavel.endereco==undefined        || dadosResponsavel.endereco==null        || dadosResponsavel.id_aluno==''               ||
                dadosResponsavel.id_aluno==undefined || dadosResponsavel.id_aluno==null                             
            )
                return message.ERROR_REQUIRED_FIELDS
            else{
                let novoResponsavel=await responsavelDAO.insertResponsavel(dadosResponsavel)
                if(novoResponsavel){
                    let ultimoID=await responsavelDAO.selectLastID()
                    novoResponsavelJSON={
                        responsavel: dadosResponsavel,
                        status: message.SUCCESS_CREATED_ITEM.status,
                        status_code: message.SUCCESS_CREATED_ITEM.status_code,
                        message: message.SUCCESS_CREATED_ITEM.message,
                        id: ultimoID[0].id
                    }
                    return novoResponsavelJSON
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

const setAtualizarAluno=async function(id, dadosResponsavel, contentType){
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            let idAluno=id
            if(idAluno==''||idAluno==undefined||isNaN(idAluno)||idAluno==null)
                return message.ERROR_INVALID_ID
            else{
                let aluno=await responsavelDAO.selectByIDAluno(idAluno)
                if(aluno){
                    let alunoAtualizadoJSON={}
                    let alunoAtualizado=await responsavelDAO.updateAluno(idAluno, dadosResponsavel)
                    if(alunoAtualizado){
                        alunoAtualizadoJSON.aluno=dadosResponsavel
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
            let verificaAluno=await responsavelDAO.selectByIDAluno(idAluno)
            if(verificaAluno.length<1)
                return message.ERROR_NOT_FOUND
            else{
                let comando=await responsavelDAO.deleteAluno(id)
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

const getListarResponsaveis=async function(){
    try {
        let responsaveisJSON={}
        let dadosResponsaveis=await responsavelDAO.selectAllResponsaveis()
        if(dadosResponsaveis){
            responsaveisJSON.responsaveis=dadosResponsaveis
            responsaveisJSON.quantidade=dadosResponsaveis.length
            responsaveisJSON.status_code=200
            return responsaveisJSON
        }else
            return message.ERROR_INTERNAL_SERVER_DB
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarAlunoPeloID=async function(id){
    try {
        let idAluno=id
        let responsaveisJSON={}
        if(idAluno==''||idAluno==undefined||isNaN(idAluno))
            return message.ERROR_INVALID_ID
        else{
            let dadosResponsavel=await responsavelDAO.selectByIDAluno(idAluno)
            if(dadosResponsavel){
                if(dadosResponsavel.length>0){
                    responsaveisJSON.aluno=dadosResponsavel
                    responsaveisJSON.status_code=200
                    return responsaveisJSON
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
        let responsaveisJSON={}
        if(idTurma==''||idTurma==undefined||isNaN(idTurma))
            return message.ERROR_INVALID_ID
        else{
            let listaAlunos=await responsavelDAO.selectByTurmaAlunos(idTurma)
            if(listaAlunos){
                if(listaAlunos.length>0){
                    responsaveisJSON.alunos=listaAlunos
                    responsaveisJSON.status_code=200
                    return responsaveisJSON
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
    setInserirNovoResponsavel,
    setAtualizarAluno,
    setDeletarAluno,
    getListarResponsaveis,
    getBuscarAlunoPeloID,
    getBuscarAlunosPelaTurma
}