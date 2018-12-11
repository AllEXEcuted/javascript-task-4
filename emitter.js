'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */

function getEmitter() {
    const allEvents = new Map();

    return {

        /**
         * Подписаться на событие
         * @param {String} newEvent
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (newEvent, context, handler) {
            if (!allEvents.get(newEvent)) {
                allEvents.set(newEvent, new Map());
            }

            if (!allEvents.get(newEvent).get(context)) {
                allEvents.get(newEvent).set(context, []);
            }

            allEvents.get(newEvent).get(context)
                .push(handler);

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            Array.from(allEvents.entries())
                .filter((value)=>value[0] === event || value[0].startsWith(`${event}.`))
                .map((value)=>allEvents.get(value[0]))
                .forEach((item)=>item.delete(context));

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            event.split('.').map((item, i, arr)=>arr.slice(0, i + 1).join('.'))
                .reverse()
                .forEach(newEvent => {
                    if (allEvents.get(newEvent)) {
                        allEvents.get(newEvent).forEach((handlers, context)=> {
                            handlers.forEach(heandler=> {
                                heandler.call(context);
                            });
                        });
                    }
                });

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
