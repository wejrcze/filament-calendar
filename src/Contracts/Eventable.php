<?php

namespace Guava\Calendar\Contracts;

use Guava\Calendar\ValueObjects\Event;

interface Eventable
{ //muj commnet
    public function toEvent(): array | Event;
}
