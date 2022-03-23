const { Router } = require( 'express' );
const router = Router();
const admin = require( 'firebase-admin' );
const functions = require( 'firebase-functions' );

var serviceAccount = require( '../../g9-crud-71456-firebase-adminsdk-pl8u2-effed438b1.json' );

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://g9-crud-71456-default-rtdb.firebaseio.com"
  });

const db = admin.database();

router.get( '/', async ( req, res ) => {

  var query = await db.ref( 'contacts' ).orderByKey();
  
  query.once( "value" )
    .then( function ( snapshot ) {
      const contacts = [];
      snapshot.forEach( function ( child ) {
        var pkey = child.key;
        var cval = child.val();

        cval.key = pkey
        contacts.push( cval )

      });
     
      res.render( 'index', {contacts : contacts});
    })
  
    
  
} );

router.post( "/new-contact", async ( req, res ) => {
  const newContact = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone
  };

  await db.ref( 'contacts' ).push( newContact );
  res.redirect( "/" );
} );

//delete
router.get( "/delete-contact/:key", async( req, res ) => {
  await db.ref( 'contacts/' + req.params.key ).remove();
  res.redirect("/")
})

//update


module.exports = router;