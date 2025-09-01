const router = require('express').Router();
const groupsContollor = require('../controllors/groups.controllor')









router.get('/groups',groupsContollor.getGroups)


router.get('/groups/:id',groupsContollor.getGroup)




module.exports = router;