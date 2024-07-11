import React, { useEffect, useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { ButtomDefaultStyled } from '../components/ButtomDefault/ButtomDefaultStyled';
import Conteudo, { StyledRow } from './MainStyled';
import StyledForm, { FormGroup, FormInput } from '../components/Formulario/Formulario';
import { ArrayType, SubmissionType, TaskType } from "../types/ArrayTypes";
import { v4 as uuid } from 'uuid';


function MenuConteudo() {
    const [taskName, setTaskName] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [editId, setEditId] = useState<string | null>(null);
    const [submissionLog, setSubmissionLog] = useState<SubmissionType[]>([]);

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTaskName(event.target.value);
    }

    function handleDescChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTaskDesc(event.target.value);
    }

    function createTask(event: React.FormEvent) {
        event.preventDefault();
        if (!taskName || !taskDesc) return;

        const newTask = {
            taskId: editId ? editId : uuid(),
            taskName,
            taskDesc
        };

        if (editId) {
            const updatedTasks = tasks.map(task => task.taskId === editId ? newTask : task);
            setTasks(updatedTasks);
        } else {
            setTasks([...tasks, newTask]);
        }

        const newLogEntry = { TaskName: taskName, TaskDescription: taskDesc };
        setSubmissionLog(prevLog => [...prevLog, newLogEntry]);

        clearInputs();
    }

    useEffect(() => {
        console.table(submissionLog);
    }, [submissionLog]);

    function selectForEdit(taskId: string) {
        const task = tasks.find(task => task.taskId === taskId);
        if (task) {
            setTaskName(task.taskName);
            setTaskDesc(task.taskDesc);
            setEditId(taskId);
        }
    }

    function deleteTask(taskId: string) {
        setTasks(tasks.filter(task => task.taskId !== taskId));
    }

    function clearInputs() {
        setTaskName('');
        setTaskDesc('');
        setEditId(null);
    }

    return (
        <Conteudo>
            <Row className='left' style={{ backgroundColor: "#E6E8FA", height: '100%', width: '50%' }}>
                <Col>
                    <StyledForm onSubmit={createTask}>
                        <Row className="mb-3">
                            <Col md={6}>
                                <h1>{editId ? 'Editar Tarefa' : 'Lista de Tarefas'}</h1>
                                <FormGroup controlId="formGridName">
                                    <Form.Label>Título</Form.Label>
                                    <FormInput type="text" placeholder="Título da Tarefa" value={taskName} onChange={handleNameChange} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup controlId="formGridDescription">
                                    <Form.Label>Descrição</Form.Label>
                                    <FormInput type="text" placeholder="Descreva a Tarefa" value={taskDesc} onChange={handleDescChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <ButtomDefaultStyled type="submit">{editId ? 'Atualizar' : 'Salvar'}</ButtomDefaultStyled>
                        {editId && <ButtomDefaultStyled onClick={clearInputs}>Cancelar</ButtomDefaultStyled>}
                    </StyledForm>
                </Col>
            </Row>
            <StyledRow>
                {tasks.map(task => (
                    <Col key={task.taskId} style={{ width: '50%', height: 'auto', display: 'inline-block', alignItems: 'center', justifyContent: 'start' }}>
                        <h2>{task.taskName}</h2>
                        <p>{task.taskDesc}</p>
                        <ButtomDefaultStyled onClick={() => deleteTask(task.taskId)}>Apagar</ButtomDefaultStyled>
                        <ButtomDefaultStyled onClick={() => selectForEdit(task.taskId)}>Editar</ButtomDefaultStyled>
                    </Col>
                ))}
            </StyledRow>
        </Conteudo>
    );
}

export default MenuConteudo;
