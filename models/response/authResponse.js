
const authResponse = (user, token) => {
    return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        role: user.role,
        token: token
    };
};

module.exports = authResponse;