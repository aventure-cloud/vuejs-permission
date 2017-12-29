"use strict";

class Acl {

    constructor(router, permissions, fail) {
        this.router = router;
        this.permissions = this.clearPermissions(permissions);
        this.fail = fail
    }

    check(permission) {
        if (permission === undefined)
            return false;

        const permissions = (permission.indexOf('|') !== -1) ? permission.split('|') : [permission];

        return this.findPermission(permissions) !== undefined;
    }

    findPermission(pem) {
        return pem.find((permission) => {
            const needed = (permission.indexOf('&') !== -1) ? permission.split('&') : permission;
            if (Array.isArray(needed))
                return needed.every( need => (this.permissions.indexOf(need) !== -1) );

            return this.permissions.indexOf(needed) !== -1;
        })
    }

    clearPermissions(permissions) {
        if(!permissions)
            return [];

        if (permissions.indexOf('&') !== -1)
            permissions = permissions.split('&');

        return Array.isArray(permissions) ? permissions : [permissions];
    }

    set router(router) {
        router.beforeEach((to, from, next) => {
            if(to.meta.permission === 'public' || to.meta.permission === undefined)
                return next();

            let fail = to.meta.fail || this.fail || from.fullPath;

            if (!this.check(to.meta.permission))
                return next(fail);

            return next();
        })
    }
}

let acl = new Acl();