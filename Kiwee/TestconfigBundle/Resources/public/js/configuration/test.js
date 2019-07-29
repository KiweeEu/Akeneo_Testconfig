'use strict';

define([
    'pim/form',
    'underscore',
    'kiwee/testconfig/template/configuration/test'],
    function (
        BaseForm,
        _,
        template
    ) {
        return BaseForm.extend({
            events: {
                'change .kiwee-config': 'updateModel',
            },
            template: _.template(template),
            code: 'oro_config_testconfig',

            configure (...args) {
                this.trigger('tab:register', {
                    code: this.code,
                    label: 'Test Config'
                });

                return BaseForm.prototype.configure.apply(this, args);
            },

            /**
             * {@inheritdoc}
             */
            render (...args)  {
                this.$el.html(this.template({
                    'test_var': this.getFormData().kiwee_testconfig___test_var.value
                }));

                console.log(this.getFormData());
                this.delegateEvents();

                return BaseForm.prototype.render.apply(this, args);;
            },

            /**
             * Update model after value change
             *
             * @param {Event} event
             */
            updateModel (event) {
                const name = event.target.name;
                const data = this.getFormData();
                const newValue = event.target.value;
                if (name in data) {
                    data[name].value = newValue;
                } else {
                    data[name] = {value: newValue};
                }
                this.setData(data);
            }
        });
    }
);