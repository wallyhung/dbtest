package com.wally.pattern.composite;

import java.util.ArrayList;

public class ProjectManager extends Employer {
	
	@SuppressWarnings("rawtypes")
	public ProjectManager(String name) {
		
		setName(name);
		employers = new ArrayList();		
	}

	@SuppressWarnings("unchecked")
	@Override
	public void add(Employer employer) {
		employers.add(employer);

	}

	@Override
	public void delete(Employer employer) {
		employers.remove(employer);
	}

}
