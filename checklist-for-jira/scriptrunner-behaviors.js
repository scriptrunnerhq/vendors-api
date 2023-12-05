/*
    Implementation of the vendor API available at: https://github.com/scriptrunnerhq/vendors-api/tree/main
    Makes behaviors scripts able to update Checklist data, make it read only, or trigger scripts when a value changes.
 */
define('okapya/checklist/scriptrunner-behaviors',
    ['jquery'],
    function ($) {
        var apiKey = 'scriptrunner-vendors-api';

        function init(field) {
            // Behavior API should be initialized ASAP in case a function is called before the custom field is rendered.
            // Use the `waitForView` Promise to wait for the view to be rendered.
            // Call `setView` once the view is rendered to resolve the promise.
            var setView;
            var waitForView = new Promise(function (resolve) {
                setView = resolve;
            });

            var behaviorApi = {
                getValue: function () {
                    return new Promise(function (resolve, reject) {
                        waitForView.then(function (view) {
                            try {
                                // Return JSON string. ScriptRunner by default will return a string of data-scriptrunner-vendors-api-stored-value
                                // So to keep API usage consistent we also return a string in here. It's also easier in the scripts to convert it to item.
                                resolve(JSON.stringify(view.model.get("items")));
                            } catch (err) {
                                reject(err);
                            }
                        });
                    });
                },
                setValue: function (value) {
                    return new Promise(function (resolve, reject) {
                        waitForView.then(function (view) {
                            try {
                                if (typeof value === "string") {
                                    value = JSON.parse(value);
                                }
                                if (!(value instanceof Array)) {
                                    value = [value];
                                }
                                view.mergeChecklistGlobalItems(value);
                                view.overwriteChecklistLocalItems(value);
                                resolve();
                            } catch (err) {
                                reject(err);
                            }
                        });
                    });
                },
                bindOnChange: function (callback) {
                    return new Promise(function (resolve, reject) {
                        waitForView.then(function (view) {
                            try {
                                view.on('checklist:updated', function () {
                                    callback({ fieldId: view.context.customFieldId, value: JSON.stringify(view.model.get("items")) });
                                });
                                resolve();
                            } catch (err) {
                                reject(err);
                            }
                        });
                    });
                },
                setReadOnly: function (readOnly) {
                    return new Promise(function (resolve, reject) {
                        waitForView.then(function (view) {
                            try {
                                view.forceReadOnlyState(readOnly);
                                resolve();
                            } catch (err) {
                                reject(err);
                            }
                        });
                    });
                }
            };

            var $field = $(field);
            $field.data(apiKey, behaviorApi);
            $field.attr("data-" + apiKey, 'true');
            console.info("Checklist for Jira - ScriptRunner Behaviours registered.");

            return setView;
        }

        return {
            init: init
        };
    }
);
