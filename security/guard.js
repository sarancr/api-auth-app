const pool = require('../util/pool');
const format = require('pg-format');

const auth = (req, res, next, permission) => {
  // Grab the "Authorization" header.
  const auth = req.get("authorization");

  // On the first request, the "Authorization" header won't exist, so we'll set a Response
  // header that prompts the browser to ask for a username and password.
  if (!auth) {
    res.set("WWW-Authenticate", 'Basic realm="Authorization Required"');
    // If the user cancels the dialog, or enters the password wrong too many times,
    // show the Access Restricted error message.
    return res.status(401).send("Authorization Required");
  }

  // If the user enters a username and password, the browser re-requests the route
  // and includes a Base64 string of those credentials.
  const credentials = new Buffer(auth.split(" ").pop(), "base64")
    .toString("ascii")
    .split(":");

  var sql = "";

  // For private API, need to check permission
  if (permission && permission != null) {
    sql = format(
      "select count(*) from user_permission up inner join public.user u on (u.id = up.user_id) inner join public.permission p on (p.id = up.permission_id) where u.login_id = '%s' and u.password = '%s' and p.name = '%s' ",
      credentials[0],
      credentials[1],
      permission
    );
  } else {
    // For non-private API, we don't have to check user permission
    sql = format(
      "select count(*) from public.user where login_id = '%s' and password = '%s'",
      credentials[0],
      credentials[1]
    );
  }
  console.log(sql);
  pool.query(sql, (err, rslt) => {
    console.log(err, rslt);
    if (
      rslt.rows &&
      rslt.rows[0] &&
      rslt.rows[0].count &&
      rslt.rows[0].count > 0
    ) {
      //pool.end();
      next();
    } else {
      // The user's username or password wrong.
      return res.status(403).send("Access Denied (incorrect credentials)");
    }
  });
};

/**
 * Protects against access level
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const guard = (req, res, next) => {
  // we’ll use a case switch statement on the route requested
  switch (req.path) {
    case "/products": {
      // Anonymous Access
      next();
      break;
    }
    case "/order": {
      // Authenticated access level
      auth(req, res, next, null);
      break;
    }

    case "/pending": {
      // Private access level (admin access)
      auth(req, res, next, "admin");
      break;
    }
  }
};

module.exports = guard;
