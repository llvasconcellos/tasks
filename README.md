# CakePHP Application Skeleton

[![Build Status](https://api.travis-ci.org/cakephp/app.png)](https://travis-ci.org/cakephp/app)
[![License](https://poser.pugx.org/cakephp/app/license.svg)](https://packagist.org/packages/cakephp/app)

Sistema de gerenciamento de tarefas usando [CakePHP](http://cakephp.org) 3.0, AngularJS, PHP e mySQL.

## Requisitos
1. PHP 5.4
2. Apache 2.4
3. mySQL 5

## Instalacao

1. Faca o download ou clone o repositorio.
2. Crie um Virtual Host no Apache apontando para o diretorio webroot do projeto.
3. Crie um banco de dados no mysql (ex.: tarefas).
4. Importe o script tarefas.sql no banco.
5. Ajuste as configuracoes de conexao ao banco no arquivo config/app.php
6. Abra o navegador para rodar o sistema (ex.:[http://tarefas.dev](http://tarefas.dev))