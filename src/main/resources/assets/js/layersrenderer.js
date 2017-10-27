void function (global) {
  if (!data || !data.template) {
    return;
  }

  const div = (title, type, children = []) => {
    const el = document.createElement('div');
    el.classList.add(`layersrenderer__block`);
    el.classList.add(`layersrenderer__${type}`);
    const header = document.createElement('div');
    header.classList.add(`layersrenderer__title`);
    header.innerHTML  = title;
    [header, ...children].forEach((child) => el.append(child));
    return el;
  };

  const parseComponents = (components = []) => {
    return components.map(component => {
      return div(component.name, component.type, getChildren(component));
    });
  }

  const parseRegions = (regions = {}) => {
    return Object.keys(regions).map(name => {
      const region = regions[name];
      return div(region.name, 'region', getChildren(region));
    });
  }

  function getChildren(element) {
    return [
      ...parseComponents(element.components),
      ...parseRegions(element.regions)
    ];
  }

  const init = () => {
    const app = document.getElementById(`layersrendererid_${uid}`);
    const { template, regions } = data;
    app.append(div(template, 'template', getChildren(data)));
  };

  setTimeout(init, 100);
}(window || global);
