export class DOMManager {
	constructor(components = []) {
		this.components = components;
	}

	setComponents(newComponentsList) {
		const updatedComponentsList = newComponentsList.map(component => {
			const currentComponent = this.components.find(
				c => c.key === component.key
			);

			return currentComponent.isEqualNode(component)
				? currentComponent
				: component;
		});

		this.components = updatedComponentsList;
	}
}
