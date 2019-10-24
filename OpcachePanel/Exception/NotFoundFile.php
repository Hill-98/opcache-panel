<?php
declare(strict_types=1);

namespace OpcachePanel\Exception;

use Exception;

class NotFoundFile extends Exception
{
    public function __construct($filename)
    {
        parent::__construct("$filename not found.", 404, null);
    }
}