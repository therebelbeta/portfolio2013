/*Routes*/

$.routes.add('/', $handlers.intro);

$.routes.add('/skills/{which:string}', $handlers.skills);

$.routes.add('/portfolio/{which:string}', $handlers.portfolio);

$.routes.add('/whoami', $handlers.whoami);

$.routes.add('/contact/{which:string}', $handlers.contact);

$.routes.add('/notfound', $handlers.notfound);