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

router.get( '/', async( req, res ) => {
    
   await db.ref( 'contacts' ).on( 'value', ( snapshot ) => {
        const data = snapshot.val();
      
       res.render( 'index', {contacts : data} );
    })
   
} );

router.post( "/new-contact", async ( req, res ) => {
  const newContact = { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, phone: req.body.phone };

  await db.ref( 'contacts' ).push( newContact );
  res.redirect( "/" );
} );


module.exports = router;