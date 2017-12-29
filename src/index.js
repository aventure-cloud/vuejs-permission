"use strict";

import Acl from 'Acl';

export default {
    install: (Vue, {router, init, fail, save}) => {

        const bus = new Vue();

        let acl = new Acl(router, init, fail);

        Vue.prototype.$can = (permission) => acl.check(permission);

        Vue.mixin({
            data() {
                return {
                    access: acl.clearPermissions(init)
                }
            },
            watch: {
                access(value) {
                    acl.permissions = acl.clearPermissions(value);
                    bus.$emit('access-changed', acl.permissions);
                    this.$forceUpdate();
                }
            },
            mounted() {
                bus.$on('access-changed', (permission) => this.access = permission);
            }
        });
    }
};