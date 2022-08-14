export const PRODUCT = {
    TYPE_FIXED: 1,
    TYPE_WITH_OPTIONS: 2,
};

export const ORDER = {
    TYPE_ON_SITE: 1,
    TYPE_TAKE_AWAY: 2,
    TYPE_DELIVERY: 3,
};

export const OPTION = {
    QUANTITIES : {
        QUANTITY_A_LITTLE: 1,
        QUANTITY_MEDIUM: 2,
        QUANTITY_EXTRA: 3,
    },

    DEFAULT_QUANTITY: 2,
};

export const SHOP_USER = {
    ROLES: {
        ROLE_OWNER       : 1,
        ROLE_MASTER_CHEF : 2,
        ROLE_SHOP_KEEPER : 3,
        ROLE_COOK        : 4,
        ROLE_TRANSPORTER : 5,
    },
};
SHOP_USER.CAN_SEE_ORDERS_STATISTICS = [ SHOP_USER.ROLES.ROLE_OWNER, SHOP_USER.ROLES.ROLE_MASTER_CHEF ];
