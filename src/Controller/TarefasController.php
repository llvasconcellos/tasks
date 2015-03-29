<?php

namespace App\Controller;

class TarefasController extends AppController
{

    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
    }

    public function index()
    {
        $tarefas = $this->Tarefas->find('all');
        $this->set([
            'tarefas' => $tarefas,
            '_serialize' => ['tarefas']
        ]);
    }

    public function view($id)
    {
        $tarefa = $this->Tarefas->get($id);
        $this->set([
            'tarefa' => $tarefa,
            '_serialize' => ['tarefa']
        ]);
    }

    public function add()
    {
        $tarefa = $this->Tarefas->newEntity($this->request->data);
        
        if ($this->Tarefas->save($tarefa)) {
            $message = 'Saved';
        } else {
            $message = 'Error';
        }
        $this->set([
            'message' => $message,
            'tarefa' => $tarefa,
            '_serialize' => ['message', 'tarefa']
        ]);
    }

    public function edit($id)
    {
        $tarefa = $this->Tarefas->get($id);
        
        if ($this->request->is(['post', 'put'])) {
            $tarefa = $this->Tarefas->patchEntity($tarefa, $this->request->data);
            if ($this->Tarefas->save($tarefa)) {
                $message = 'Saved';
            } else {
                $message = 'Error';
            }
        }
        $this->set([
            'message' => $message,
            '_serialize' => ['message']
        ]);
    }

    public function delete($id)
    {
        $tarefa = $this->Tarefas->get($id);
        $message = 'Deleted';
        if (!$this->Tarefas->delete($tarefa)) {
            $message = 'Error';
        }
        $this->set([
            'message' => $message,
            '_serialize' => ['message']
        ]);
    }
}