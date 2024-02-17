const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'lightweightbaby!';
const expiration = '1h';

module.exports = {
    AuthenticationError: new GraphQLError('Not authenticated',
    {
        extensions: {
            code: 'UNAUTHENTICATED',
        },
    }),

    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;
        console.log(token);
        if (req.headers.authorization) {
            token = token.split('').pop().trim();
        }

        if (!token){
            return req;
        }

        try{
            const { data } = jwt.verify(token, secret, { maxAge: expiration});
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        return req;
    },
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    }
};
