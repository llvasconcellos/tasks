<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Tarefa Entity.
 */
class Tarefa extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    protected $_accessible = [
        'titulo' => true,
        'descricao' => true,
        'prioridade' => true,
    ];
}
