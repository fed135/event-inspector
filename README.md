# Event Inspector

Add this script before all other scripts in your page to get a meaningful 
overview of all the event listeners in your page.

Namespace: __events


!! For rough debugging only. Results may vary and are not super accurate. !!

!! Should never be used as part of production code. !!


## Methods

* Count

Returns the total number of active event listeners

* getWithEvt

Returns the list of event listeners with event name $evt

Ex: __events.getWithEvt('mouseenter');

* getWithTag

Returns the list of event listeners for tag name $tag

Ex: __events.getWithTag('a');

* countByTag

Returns the number of event listeners by tag

* countByEvt

Returns the number of event listeners by event

