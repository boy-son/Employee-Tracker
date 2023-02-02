INSERT INTO department (name)
VALUES
    ("Sales"),
    ("Marketing"),
    ("Legal"),
    ("Finance");

    INSERT INTO role (title, salary, department_id)
    VALUES
        ("Sales Lead", 90000, 1),
        ("Marketing Analyst", 70000, 2),
        ("Lawyer", 200000, 3),
        ("Accountant", 150000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES

        ("Mark", "Hoppus", 4, 1),
        ("John", "Johnson", 1, NULL),
        ("Lucas", "Baker", 2, 3),
        ("Ferdinand", "Franz", 3, 2),
        ("Harriet", "Pursley", 1, 3);

