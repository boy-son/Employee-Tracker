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

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES

        ("Mark", "Hoppus", 4, 1),
        ("John", "Johnson", 1, NULL),
        ("Lucas", "Baker", 2, 2),
        ("Brutus", "Gardner", 3, NULL),
        ("Ferdinand", "Franz", 3, 3),
        ("Howard", "Parker", 2, NULL),
        ("Harriet", "Pursley", 1, 4);

