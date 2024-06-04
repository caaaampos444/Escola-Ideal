const { PrismaClient } = require('@prisma/client')
const e = require('express')

const prisma = new PrismaClient()

const insertResponsavel = async function (dadosResponsavel) {
    try {
        let sql = `insert into tbl_enderecos(
            cep,
            logradouro,
            número,
            bairro,
            cidade
        ) values(
            '${dadosResponsavel.endereco.cep}',
            '${dadosResponsavel.endereco.logradouro}',
            '${dadosResponsavel.endereco.numero}',
            '${dadosResponsavel.endereco.bairro}',
            '${dadosResponsavel.endereco.cidade}'
        )`
        let result = await prisma.$executeRawUnsafe(sql)
        let idEndereco = await selectLastIDEndereco()
        let ultimoIDResponsavel = await selectLastID()
        if (result){
            let sql = `insert into tbl_responsaveis(
                nome,
                data_nascimento,
                email,
                cpf,
                telefone,
                id_endereco,
                id_sexo
            ) values(
                '${dadosResponsavel.nome}',
                '${dadosResponsavel.data_nascimento}',
                '${dadosResponsavel.email}',
                '${dadosResponsavel.cpf}',
                '${dadosResponsavel.telefone}',
                '${idEndereco[0].id}',
                '${dadosResponsavel.id_sexo}'
            )`
            result = await prisma.$executeRawUnsafe(sql)
            if(result){
                for(let aluno of dadosResponsavel.id_aluno){
                    sql=`insert into tbl_responsavel_aluno(
                        id_responsavel,
                        id_aluno
                    ) values(
                        ${ultimoIDResponsavel[0].id},
                        ${aluno}
                    )`
                    result=prisma.$executeRawUnsafe(sql)
                    if(result)
                        continue
                    else
                        return false
                }
                return true
            }
            else
                return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

const updateAluno = async function (id, dadosResponsavel) {
    try {
        let sql = `
            update tbl_responsaveis

            set
                nome='${dadosResponsavel.nome}',
                data_nascimento='${dadosResponsavel.data_nascimento}',
                email='${dadosResponsavel.email}',
                foto='${dadosResponsavel.foto}',
                id_sexo='${dadosResponsavel.id_sexo}'
            
            where id=${id}
       `
        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteAluno = async function (id){
    try {
        let sql=`
            delete from tbl_endereco_aluno where id_aluno=${id}
        `
        let result = await prisma.$executeRawUnsafe(sql)
        if(result){
            sql=`delete from tbl_responsaveis where id=${id}`
            result = await prisma.$executeRawUnsafe(sql)
            if(result)
                return true
            else
                return false
        }
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllResponsaveis = async function () {
    try {
        let sql = 'select * from tbl_responsaveis'
        let rsResponsaveis = await prisma.$queryRawUnsafe(sql)
        return rsResponsaveis
    } catch (error) {
        return false
    }
}

const selectByIDAluno = async function (id) {
    try {
        let sql = `select * from tbl_responsaveis where id=${id}`
        let rsResponsaveis = await prisma.$queryRawUnsafe(sql)
        return rsResponsaveis
    } catch (error) {
        return false
    }
}

const selectLastID = async function () {
    try {
        let sql = 'select cast(last_insert_id() as decimal) as id from tbl_responsaveis limit 1;'
        let rsID = await prisma.$queryRawUnsafe(sql)
        return rsID
    } catch (error) {
        return false
    }
}

const selectLastIDEndereco = async function () {
    try {
        let sql = 'select cast(last_insert_id() as decimal) as id from tbl_enderecos limit 1;'
        let rsID = await prisma.$queryRawUnsafe(sql)
        return rsID
    } catch (error) {
        return false
    }
}

module.exports = {
    insertResponsavel,
    updateAluno,
    deleteAluno,
    selectAllResponsaveis,
    selectByIDAluno,
    selectLastID
}