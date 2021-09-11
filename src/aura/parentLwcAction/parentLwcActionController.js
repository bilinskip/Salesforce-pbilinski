({
	closeComponent : function(component, event, helper) {
        console.log('event catched ');
		$A.get("e.force:closeQuickAction").fire();
	}
})