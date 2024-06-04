const { PrismaClient } = require('@prisma/client')
const e = require('express')

const prisma = new PrismaClient()

const insertAluno = async function (dadosAluno) {
    try {
        let sql = `insert into tbl_alunos(
            nome,
            data_nascimento,
            email,
            foto,
            cpf,
            id_sexo
        ) values(
            '${dadosAluno.nome}',
            '${dadosAluno.data_nascimento}',
            '${dadosAluno.email}',
            '${dadosAluno.foto}',
            '${dadosAluno.cpf}',
            '${dadosAluno.id_sexo}'
        )`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result){
            loop: for (let endereco of dadosAluno.endereco){
                sql = `insert into tbl_enderecos(
                    cep,
                    logradouro,
                    número,
                    bairro,
                    cidade
                ) values(
                    '${endereco.cep}',
                    '${endereco.logradouro}',
                    '${endereco.numero}',
                    '${endereco.bairro}',
                    '${endereco.cidade}'
                )`
                result = await prisma.$executeRawUnsafe(sql)
                if(result){
                    let ultimoIDAluno = await selectLastID()
                    let ultimoIDEndereco = await selectLastIDEndereco()
                    sql = `insert into tbl_endereco_aluno(
                        id_aluno,
                        id_endereco
                    ) values(
                        ${ultimoIDAluno[0].id},
                        ${ultimoIDEndereco[0].id}
                    )`
                    result = await prisma.$executeRawUnsafe(sql)
                    if(result)
                        continue loop
                    else
                        return false
                }
                else
                    return false
            }
            return true
        }
    } catch (error) {
        console.log(error);
        return false
    }
}

const updateAluno = async function (id, dadosAluno) {
    try {
        let sql = `
            update tbl_alunos

            set
                nome='${dadosAluno.nome}',
                data_nascimento='${dadosAluno.data_nascimento}',
                email='${dadosAluno.email}',
                foto='${dadosAluno.foto}',
                id_sexo='${dadosAluno.id_sexo}'
            
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
            sql=`delete from tbl_alunos where id=${id}`
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

const selectAllAlunos = async function () {
    try {
        let sql = 'select * from tbl_alunos'
        let rsAlunos = await prisma.$queryRawUnsafe(sql)
        return rsAlunos
    } catch (error) {
        return false
    }
}

const selectByIDAluno = async function (id) {
    try {
        let sql = `select * from tbl_alunos where id=${id}`
        let rsAlunos = await prisma.$queryRawUnsafe(sql)
        return rsAlunos
    } catch (error) {
        return false
    }
}

const selectLastID = async function () {
    try {
        let sql = 'select cast(last_insert_id() as decimal) as id from tbl_alunos limit 1;'
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

const selectByTurmaAlunos = async function (id) {
    try {
        let sql = ` select m.id as matricula, a.nome, t.nome as turma, a.data_nascimento, a.email from tbl_matricula_turma as i
                    join tbl_matriculas as m on m.id=i.id_matricula
                    join tbl_alunos as a on a.id=m.id_aluno
                    join tbl_turmas as t on t.id=i.id_turma
                    where t.id=${id}; `
        let rsAlunos = await prisma.$queryRawUnsafe(sql)
        return rsAlunos
    } catch (error) {
        return false
    }
}

module.exports = {
    insertAluno,
    updateAluno,
    deleteAluno,
    selectAllAlunos,
    selectByIDAluno,
    selectByTurmaAlunos,
    selectLastID
}